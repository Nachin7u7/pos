
# POS CORE

## Table of Contents

- [POS CORE](#pos-core)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Seed Data](#seed-data)
  - [Project Structure](#project-structure)
    - [Models](#models)
    - [Routes](#routes)
    - [Config](#config)
    - [Main Application](#main-application)
    - [Seed Script](#seed-script)
  - [Scripts](#scripts)

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/team-forces/pos-core.git
cd pos-core
npm install
```

## Usage

To run the project, use the following command:

```bash
npm run dev
```


## Seed Data

To seed the database with initial data, you can run the seed script:

```bash
node seed.js
```

This script will connect to your MongoDB instance, clear existing data, and insert seed data into the database.

## Project Structure

Here's an overview of the project's structure:

```
my-repo/
├── models/
│   └── User.js         # Mongoose model for User
├── routes/
│   └── userRoutes.js   # Express routes for User
├── seed.js             # Seed script to populate the database
├── config/
│   └── database.js     # Database configuration
├── app.js              # Main application file
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

### Models

- `User.js`: Defines the schema and model for User data.

### Routes

- `userRoutes.js`: Contains the Express routes for handling user-related API endpoints.

### Config

- `database.js`: Configuration file for MongoDB connection.

### Main Application

- `app.js`: The main entry point for the application. Sets up the Express server and middleware.

### Seed Script

- `seed.js`: Script for seeding the database with initial data.

## Scripts

The following scripts are available in the project:

- `dev`: Starts the Node.js application with dev.
- `seed`: Runs the seed script to populate the database.

You can run these scripts using `npm run <script-name>`.

