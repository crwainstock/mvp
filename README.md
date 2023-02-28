# Kid Library MVP

## Introduction

The Kid Library app is a single-page application built with React, Express, Node, and MySQL and styled with Bootstrap. It uses React-Router to enable multiple page navigation.

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p` or use the MySQL CLI.
- Create a new database called mybooks: `create database mybooks`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=mybooks
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the my-express-app folder of this repository, in a new terminal window. This will create a table called 'mylibrary' in your database.

- Make sure you understand how the `mylibrary` table is constructed. In your MySQL console, you can run `use mybooks;` and then `describe mylibrary;` to see the structure of the students table.

### Development

- Run `npm start` in project directory to start the Express server on port 5000.
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## Functionality Overview

## Looking Ahead
