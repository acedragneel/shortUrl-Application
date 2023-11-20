# Short URL Application

This Node.js and Express.js-based application, with MySQL integration, provides a simple API for shortening and managing URLs. The application utilizes basic authentication for secure access and can be tested using Postman.

## Features

1. **Get User**
   - Endpoint: `GET /api/user`
   - Description: Retrieve user information.

2. **Create User**
   - Endpoint: `POST /api/user`
   - Description: Create a new user.
   - Request Body:
     ```json
        {
            "firstName" : "Tom",
            "lastName"  : "Hanks",
            "username"  : "tom@gmail.com",
            "password"  : "-"
        }
     ```

3. **Update User**
   - Endpoint: `PUT /api/user`
   - Description: Update user information.
   - Request Body:
     ```json
        {
            "firstName" : "Tom",
            "lastName"  : "Hanks",
            "username"  : "tom@gmail.com",
            "password"  : "--"
        }
     ```

4. **Get Health**
   - Endpoint: `GET /api/health`
   - Description: Check the health status of the application.

5. **Shorten URL**
   - Endpoint: `POST /api/shorten`
   - Description: Shorten a long URL.
   - Request Body:
     ```json
        {
            "longUrl" : "url",
            "tier": 1
        }
     ```
   - Response:
    ```json
        {
            "id": 4,
            "url": "url",
            "shorturl": "VFqB3zYh9",
            "tier": 1,
            "tier_value": 1000,
            "date_added": "2023-11-20T01:02:16.000Z",
            "date_last_updated": "2023-11-20T01:02:16.000Z",
            "owner_user_id": 1
        }
     ```

6. **Redirect URL**
   - Endpoint: `GET /:shortCode`
   - Description: Redirect to the original URL using the provided short code.

7. **URL History**
   - Endpoint: `GET /api/history`
   - Description: Retrieve the history of shortened URLs.
   - Response:
     ```json
     [
        {
            "id": 4,
            "url": "url",
            "shorturl": "VFqB3zYh9",
            "tier": 1,
            "tier_value": 1000,
            "date_added": "2023-11-20T01:02:16.000Z",
            "date_last_updated": "2023-11-20T01:02:16.000Z",
            "owner_user_id": 1
        },
       // Additional history items...
     ]
     ```

## Usage

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set environment variables:


   - DB_USER="--"
   - DB_PASSWORD="--"
   - DB_DATABASE="--"
   - DB_HOST="--"


3. Run the application:

   ```bash
   npm start
   ```

4. Open Postman and start testing the endpoints using the provided features.

## Notes

- Make sure to handle basic authentication in your Postman requests by providing the username and password in the appropriate fields.
- The application uses MySQL for data storage. Ensure to configure the MySQL environment variables for proper database connectivity.
- The application automatically creates the necessary table in the MySQL database on startup.
- Consider additional security measures such as input validation and error handling for a production-ready solution.
- Replace placeholder values with actual credentials and sensitive information.