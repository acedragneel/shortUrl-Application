const shortid = require('shortid');
const logger = require('../logger/logger')

const {ShortUrl,User} = require('../models')

const {validateUrl,validateTier,checkResponseForShortUrl,checkResponseForHistory,validateEmail} = require('../validation/validation');

const urlShort = async (req,res) => { 
    const response = req.body;
    const longUrl = req.body.longUrl;
    const tier = req.body.tier
    const iduser = req.params.userId;
    const error = "Invalid URL"
    const errormsgId = "Invalid id"

    let idError = iduser => validateNumber;

    let isUrl = await validateUrl(longUrl);
    let responseErr = checkResponseForShortUrl(response);
    let isTier = validateTier(tier);

    if(responseErr){

        if(isTier){

            let tier_value = 0;
            if(tier == 1){
                tier_value = 1000
            }else if(tier == 2){
                tier_value = 100
            }

            if(idError){

                const userFound = await User.findOne({
                    attributes: {exclude: ['password']},
                    where: { id: iduser },
                }).catch((err) => {
                    if(err){
                        console.log(err);
                        logger.customlogger.error('DB Error: User is not found during the get of User')    
                    }
                });
        
                if(userFound == null ){
                    res.status(400).send("The userid doesn't exists")
                    logger.customlogger.error('The userid does not exists')
        
                }else{
        
                    if(isUrl){
                        const shortUrl =  shortid.generate();
                        
                        console.log(shortUrl)
        
                        await ShortUrl.create({
                            url : longUrl,
                            shorturl : shortUrl,
                            tier:tier,
                            tier_value: tier_value,
                            owner_user_id:userFound.id
                        }).catch((err) => {
                            if(err){
                                console.log(err);
                                logger.customlogger.error("DB Error: can't add a url ")
                            }
                        });
                        res.status(201)
                        logger.customlogger.info('The URL is Added')
                        const urlLoaded = await ShortUrl.findOne({
                            where: { shorturl: shortUrl },
                        }).catch((err) => {
                            if(err){
                                console.log(err);
                                logger.customlogger.error("DB Error: can't find the created a user")
                            }
                        });
                        res.send(urlLoaded);
                    }else{
                        res.status(400).send(error);
                        logger.customlogger.error('The Invalid URL')
                    }
                }
            }else{
                res.status(400).send(errormsgId);
                logger.customlogger.error('The Invalid Id')
            }

        }else{
            res.status(400).send("Invalid Tier it can be either 1 or 2");
            logger.customlogger.error("Invalid Tier it can be either 1 or 2")
        }

    }else{
            res.status(400).send("UnIntend Key or No key is being sent ");
            logger.customlogger.error("UnIntend Key or No key is being sent")

    }

};

const redirectUrl = async (req,res) => { 
    const shortUrl = req.params.shortUrl;

    const urlFound = await ShortUrl.findOne({
        where: { shorturl: shortUrl },
    }).catch((err) => {
        if(err){
            console.log(err);
            logger.customlogger.error('DB Error: URL is not found')    
        }
    });    

    let tier_value = urlFound.tier_value;
    tier_value -= 1;

    urlFound.update({
        tier_value: tier_value,
    }, { merge: true }).then(() => {
        logger.customlogger.info("URL tier_value updated updated successfully") 
        console.log("//Tier value update"+ '\n' +  JSON.stringify(urlFound) +  "is updated")
    }).catch((error) => {
    console.error("Error updating tier_value: ", error);
    logger.customlogger.error('DB Error: Error updating tier_value')
    }); 

    if(urlFound == null ){
        res.status(400).send("The url doesn't exists")
        logger.customlogger.error('The url does not exists')

    }else{
        res.redirect(urlFound.url);
        logger.customlogger.info("Url is Loaded")
    }
};

const historyUrl = async (req,res) => { 
    const response = req.body;
    const email = req.body.email;

    let emailError = validateEmail(email);

    let responseErr = checkResponseForHistory(response);

    if(responseErr){

        if(emailError){

            const userFound = await User.findOne({
                attributes: {exclude: ['password']},
                where: { username: email },
            }).catch((err) => {
                if(err){
                    console.log(err);
                    logger.customlogger.error('DB Error: User is not found during the get of User')    
                }
            });
        
            if(userFound == null ){
                res.status(400).send("The userid doesn't exists")
                logger.customlogger.error('The userid does not exists')
        
            }else{
        
                const urlLoaded = await ShortUrl.findAll({
                    where: { owner_user_id: userFound.id },
                }).catch((err) => {
                    if(err){
                        console.log(err);
                        logger.customlogger.error('DB Error: URL is not found')    
                    }
                });    
        
                res.send(urlLoaded);
                logger.customlogger.info("History is Loaded")
        
            }



        }else{
            res.status(400).send("Invalid email");
            logger.customlogger.error("Invalid email")
        }

    }else{
        res.status(400).send("UnIntend Key or No key is being sent ");
        logger.customlogger.error("UnIntend Key or No key is being sent")
    }

    
   
};

module.exports = {
    urlShort,
    redirectUrl,
    historyUrl
};
