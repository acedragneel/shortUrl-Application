const {User} = require('./users')
module.exports = (sequelize, DataTypes) => {
    const ShortUrl = sequelize.define("ShortUrl",{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            readOnly: true,
            validate: {
                notEmpty:true
            }
        },
        url:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty:true
            }
        },
        shorturl:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notEmpty:true
            }
        },
        tier: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate: {
                notEmpty:true
            }
        },
        tier_value: {
            type: DataTypes.INTEGER,
            allowNull:false,
            validate: {
                notEmpty:true
            }
        },  
        date_added: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW'),
            readOnly: true
        },
        date_last_updated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW'),
            readOnly: true
        },
        owner_user_id: {
            type: DataTypes.INTEGER,
       }   
    },{
        timestamps: false
    })
    return ShortUrl;
}