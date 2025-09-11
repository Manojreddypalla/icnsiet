# ICNSIET Admin Panel

This is the admin panel for the ICNSIET conference management system. It is a React application built with Vite that provides a dashboard for managing papers, users, and reviews.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)

## Features

- User authentication for admins and reviewers
- Dashboard with statistics on paper submissions
- Paper management, including assigning reviewers and updating paper status
- User management, including adding new users

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the `Admin` directory:
   ```bash
   cd Admin
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

The application uses a `config.js` file to configure the API base URL. You can modify this file to point to your backend API.

## Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

To build the application for production, use the following command:

```bash
npm run build
```

## Project Structure

The `Admin` project has the following structure:

```
/
├── public/
│   ├── ... (static assets)
├── src/
│   ├── components/
│   │   ├── ... (React components)
│   ├── pages/
│   │   ├── ... (React pages)
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

- **`public/`**: Contains static assets.
- **`src/components/`**: Contains reusable React components.
- **`src/pages/`**: Contains the pages of the application.
- **`src/App.jsx`**: The main application component that sets up the routing.
- **`src/main.jsx`**: The entry point of the application.
