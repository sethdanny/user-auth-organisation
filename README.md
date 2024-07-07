# User Authentication & Organisation Management API

## Overview

This project is a backend application for user authentication and organization management. It is built using Express.js, Sequelize, JWT for authentication, and PostgreSQL for the database.

## Features

- User Registration with default organization creation.
- User Login with JWT authentication.
- Protected endpoints to manage users and organizations.
- Unit and end-to-end testing.

## Technologies Used

- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JSON Web Token (JWT)
- **Password Hashing**: bcrypt
- **Testing**: Mocha, Chai, and Supertest
- **Deployment**: Heroku

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- Git installed

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sethdanny/user-auth-organisation.git
   cd user-auth-organisation

2. Install dependencies:
npm install

3. Create a `.env` file in the root directory and add the following environment variables:
DATABASE_URL=postgres://username:password@localhost:5432/your_database
JWT_SECRET=your_jwt_secret

4. Set up the database:
npx sequelize-cli db:create
npx sequelize-cli db:migrate

5. Start the server:
npm start
The server should now be running on `http://localhost:3000`.

## API Endpoints
### Auth Endpoints
* POST /auth/register - Register a new user and create a default organization.
    * Request Body:
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}.

* Success Response:
{
  "status": "success",
  "message": "Registration successful",
  "data": {
    "accessToken": "eyJh...",
    "user": {
      "userId": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string"
    }
  }
}

### Documentation
* Postman - https://documenter.getpostman.com/view/27746757/2sA3e1BA6a

