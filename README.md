# Kid Library MVP 📚

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
  - You'll need to update the bookId column so it won't accept duplicate entries:

```
ALTER TABLE mylibrary
ADD CONSTRAINT unique_bookid UNIQUE KEY(bookId);
```

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
  - `id` -- This column is generated automatically in the database. It serves as the primary key for the table. This is what is being referred to if id is mentioned in the comments in the code.
  - `bookId` -- This column is taken from the Google Books API. It is integral to the functionality of the app. It is what connects the database to the book detail information in the Google API. Initially, this was used as the id for the table, but there were some problems related to the values not being numerical. This is what is being referenced if bookId is mentioned in the comments in the code.
  - `rating` -- This column isn't necessary at this point in development. It was created with a rating feature in mind, but that feature hasn't made it into the app yet. It was meant to hold a numerical rating for each book.
  - `review` -- This column holds review data generated by users in the book details view page. It can be empty.

### Development

- Open a terminal, and do `cd my-express-app`. Run `npm start` to start the Express server on port 5000.
- In another terminal, do `cd my-express-app` and then `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.
- _Note_: The client folder holds everything to do with the front end of the app. The my-express-app encapsulates the whole app, including all back end files and the client files.

## Code & Functionality Overview

- **Front End**

  - This project includes pages and components.
  - `App.js` is where the routes (pages) are defined.
  - **Pages** include:
    - `Home` "/"
      - This page renders the `MyLibraryWidget` and `Search` components.
    - `MyLibraryView` "/mylibrary"
    - `BookDetailView` "/mylibrary/${bookId}"
  - Each page includes code to fetch data from the external API and/or database.
  - Since only the bookId (from the external API) is stored in the database, this value is used to search the Google Books API and return the detailed book information. It is also used in the `BookDetailView` to search the database and return the review data.
  - You can see more about front end functions and how they're organized in each page/component in [this document](https://docs.google.com/document/d/16H9LM7R9L0kpnlxoho1FrG1MixFCQ_XpMKUT5S937Tk/edit?usp=sharing).

- **Back End**
  - Project uses one MySQL table to store user-generated data (reviews). It is linked to the external API through use of the bookId values.
  - `index.js` includes all of the router functions.
    - The project uses **node-fetch** to allow for the use of fetch in the back end. You can read more about node-fetch [here](https://www.npmjs.com/package/node-fetch) if you're interested.
      - Because the external API is accessed on the back end, fetches made from the front end include the URLs built for the project (rather than the Google API URLs).
  - You can see more about router functions and how they're organized in [this document](https://docs.google.com/document/d/15Zsi57j_uF6vQbdLi3YIE2zm1OKTCM4QIMPd1E8kLK0/edit?usp=sharing).

## App Demo

You can watch [an app demo here](https://www.loom.com/share/32b795f8cc7649c2886781d2e89ea99c).

## Looking Ahead

This app includes most of the features I had envisioned when beginning this project. But, there are several things that could be added and refined in future iterations of this app.

-
