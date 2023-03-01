# Kid Library MVP

## Introduction

The Kid Library app is an application built with React, Express, Node, and MySQL and styled with Bootstrap. It uses React-Router to enable multiple page navigation and the Google Books API to access book details and information.

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

- If this doesn't work for some reason, you could also create a table manually in the MySQL CLI using the following commands:

To create the mylibrary table:

```
CREATE TABLE mylibrary (
   id int NOT NULL AUTO_INCREMENT,
   bookId varchar(40),
   rating int,
   review varchar(255),
    PRIMARY KEY (id)
);
```

To make the bookId column unique (unable to have duplicate entries):

```
ALTER TABLE mylibrary
ADD CONSTRAINT unique_bookid UNIQUE KEY(bookId);
```

- Make sure you understand how the `mylibrary` table is constructed. In your MySQL console, you can run `use mybooks;` and then `describe mylibrary;` to see the structure of the students table.

- Notes about mylibrary table:
  - `id` -- This column is generated automatically in the database. It serves as the primary key for the table.
  - `bookId` -- This column is taken from the Google Books API. It is integral to the functionality of the app. It is what connects the database to the book detail information in the Google API. Initially, this was used as the id for the table, but there were some problems related to the values not being numerical.
  - `rating` -- This column isn't necessary at this point in development. It was created with a rating feature in mind, but that feature hasn't made it into the app yet. It was meant to hold a numerical rating for each book.
  - `review` -- This column holds review data generated by users in the book details view page. It can be empty.

### Development

- Open a terminal, and do `cd my-express-app`. Run `npm start` to start the Express server on port 5000.
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## Functionality Overview

## Looking Ahead
