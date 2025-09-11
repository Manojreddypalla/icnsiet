# ICNSIET Conference Management System

This repository contains the source code for the ICNSIET (International Conference on Neural Nexus and Synergy: Innovation in Emerging Technologies) conference management system. The system is a monorepo that consists of three separate projects: a backend, a frontend, and an admin panel.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The repository is organized as a monorepo with the following structure:

- **`icnsiet-backend/`**: A Node.js/Express application that provides a RESTful API for managing papers, users, and reviews.
- **`icnsiet-frontend/`**: An Astro application that provides the public-facing website for the conference.
- **`Admin/`**: A React application built with Vite that provides a dashboard for managing papers, users, and reviews.

Each project has its own `README.md` file with detailed instructions on how to set it up and run it.

## Features

### Backend

- User registration and authentication (for admins and reviewers)
- Paper submission
- Paper review management
- User management

### Frontend

- Home page with conference information
- About page with details about the conference and the host institution
- Editorial board page
- Papers page with a list of research papers
- Committee page
- Contact page with a paper submission form
- Guidelines page for authors

### Admin Panel

- User authentication for admins and reviewers
- Dashboard with statistics on paper submissions
- Paper management, including assigning reviewers and updating paper status
- User management, including adding new users

## Getting Started

To get started with this project, you will need to set up and run each of the three projects separately. Please refer to the `README.md` file in each project's directory for detailed instructions.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
