# Backend Server - Installation Guide

Follow these steps to set up and run the backend server locally:

### Prerequisites
- Ensure that you have [Node.js](https://nodejs.org/) installed on your machine.

### Steps to Start the Backend Server

1. **Obtain Environment Configuration**  
   - Acquire the `.env` file from the tech lead or project administrator.
   - Place the `.env` file in the root directory of this project.

2. **Install Dependencies**  
   - Run the following command to install all required dependencies:
     `npm install`

3. **Start the Development Server**  
   - Once the dependencies are installed, run the following command to start the backend server locally:
     `npm run dev`

### Additional Information
- Make sure your environment variables are correctly configured in the `.env` file.
- The server will run locally on the port specified in the `.env` file.


# File and Folder Architecture

The following is an overview of the project's file and folder structure, detailing the purpose of each directory and its contents.

Folder flow goes like:
server.js -> routes/config -> controllers -> services -> utils/validations/models

1. **config/**
   - Contains the configuration files for the application, including environment variables and database connection settings.

2. **controllers/**
   - Houses the controller files responsible for handling incoming HTTP requests and returning responses. The controllers pass request data to the services layer to retrieve the necessary response.

3. **middlewares/**
   - Contains middleware functions used throughout the application. These are primarily responsible for validation, authentication, and authorization processes.

4. **models/**
   - Contains the Mongoose schemas that define the structure of the database models.

5. **routes/**
   - Contains all route definitions for the server's APIs. Each route maps to a specific controller to handle the corresponding logic.

6. **services/**
   - Holds the core business logic of the application. The services are invoked by controllers and leverage utilities and validations for further processing.

7. **tests/**
   - Contains unit and integration tests for the APIs, ensuring the functionality of the application's endpoints.

8. **utils/**
   - Contains helper functions and utility methods used across the application, primarily within the services layer.

9. **validations/**
   - Contains the validation logic for the application's models, ensuring data integrity and proper schema enforcement.

10. **server.js**
   - The entry point of the application, containing the Express server setup. This file initializes the database connection, centralizes routes, and configures other essential server functionalities.


# API Guide

### User APIs

1. **Sign up**
   - 
