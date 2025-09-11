# ICNSIET Frontend

This is the frontend for the ICNSIET conference management system. It is an [Astro](https://astro.build/) application that provides the public-facing website for the conference.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)

## Features

- Home page with conference information
- About page with details about the conference and the host institution
- Editorial board page
- Papers page with a list of research papers
- Committee page
- Contact page with a paper submission form
- Guidelines page for authors

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the `icnsiet-frontend` directory:
   ```bash
   cd icnsiet-frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:4321`.

To build the application for production, use the following command:

```bash
npm run build
```

## Project Structure

The `icnsiet-frontend` project has the following structure:

```
/
├── public/
│   ├── ... (static assets)
├── src/
│   ├── components/
│   │   ├── ... (Astro components)
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── ... (Astro pages)
└── package.json
```

- **`public/`**: Contains static assets such as images, fonts, and PDFs.
- **`src/components/`**: Contains reusable Astro components.
- **`src/layouts/`**: Contains layout components that define the structure of pages.
- **`src/pages/`**: Contains the pages of the website. Each `.astro` file in this directory becomes a page on the website.
