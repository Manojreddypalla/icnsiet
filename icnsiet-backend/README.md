# ICNSIET Backend

This is the backend for the ICNSIET conference management system. It is a Node.js/Express application that provides a RESTful API for managing papers, users, and reviews.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Features

- User registration and authentication (for admins and reviewers)
- Paper submission
- Paper review management
- User management

## Prerequisites

- Node.js (v14 or higher)
- npm
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the `icnsiet-backend` directory:
   ```bash
   cd icnsiet-backend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

The application uses a `.env` file for configuration. Create a `.env` file in the `icnsiet-backend` directory and add the following variables:

```
DATABASE_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
EMAIL_HOST=<your-email-host>
EMAIL_PORT=<your-email-port>
EMAIL_USERNAME=<your-email-username>
EMAIL_PASSWORD=<your-email-password>
```

## Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
```

To run the application in production, use the following command:

```bash
npm start
```

The server will start on port 3000 (or the port specified in your `.env` file).

## API Endpoints

### Authentication

- `POST /api/users/login`: Log in a user.
- `POST /api/users/register`: Register a new user (admin or reviewer). This is an admin-only route.

### Papers

- `POST /api/papers`: Submit a new paper.
- `GET /api/papers`: Get all papers.
- `GET /api/papers/:id`: Get a paper by its ID.
- `PATCH /api/papers/:id`: Update the status of a paper.
- `PATCH /api/papers/:id/assign`: Assign a reviewer to a paper.
- `POST /api/papers/:id/review`: Submit a review for a paper.

### Users

- `GET /api/users`: Get all users. This is an admin-only route.
- `GET /api/users/reviewers`: Get all reviewers. This is an admin-only route.
