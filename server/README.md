# Express Server Documentation

This documentation provides an overview of an Express server along with its endpoints and middleware.

## Server Configuration

The server is configured to use Express.js along with several middleware and libraries including `cors`, `express-session`, `mysql`, `bcrypt`, and `crypto`.

## Database Configuration

The server connects to a MySQL database using a connection pool. It also utilizes a MySQL session store for managing user sessions.

## Endpoints

### User Registration

- **Endpoint:** `/userRegister`
- **Method:** POST
- **Description:** Adds a new user to the database.
- **Parameters:**
  - `name`: User's name
  - `surname`: User's surname
  - `email`: User's email
  - `password`: User's password
- **Response Codes:**
  - `200`: User created successfully
  - `500`: Internal Server Error

### User Login

- **Endpoint:** `/userLogin`
- **Method:** POST
- **Description:** Authenticates user login.
- **Parameters:**
  - `email`: User's email
  - `password`: User's password
- **Response Codes:**
  - `200`: Authentication successful
  - `401`: Unauthorized: Invalid email or password
  - `500`: Internal Server Error

### Verify User Existence

- **Endpoint:** `/verifyUserExistance`
- **Method:** POST
- **Description:** Checks if a user with the provided email exists.
- **Parameters:**
  - `email`: User's email
- **Response Codes:**
  - `200`: No user found with the provided email
  - `404`: Email address already in use
  - `500`: Internal Server Error

### User Logout

- **Endpoint:** `/userLogout`
- **Method:** POST
- **Description:** Logs out the user by clearing the session.
- **Response Codes:**
  - `200`: Logout successful
  - `500`: Internal Server Error

## Middleware

### Session Middleware

- **Functionality:** Authenticates user sessions.
- **Usage:** Applied to `/userLogout` endpoint.
- **Response:** Returns 401 status code if user session is not found.

### API Key Middleware

- **Functionality:** Authenticates API access using an API key.
- **Usage:** Applied to `/userRegister`, `/userLogin`, `/verifyUserExistance`, and `/userLogout` endpoints.
- **Response:** Returns 401 status code if API key is invalid.

## Usage

The server listens on the specified port for HTTPS connections. Ensure proper HTTPS credentials are configured for secure communication.

## TODO List

- Handle wrong inputs to the endpoints properly.
- Add a site where API keys will be generated.
- Create a database table for storing API keys based on something.
- Change the secret key used for sessions.
- Finish the implementation of the user logout endpoint.

