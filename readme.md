# Kitabu

Kitabu (Swahili for book) parses through `.txt` book files to gather pertinent data for the book.

_This is a code challenge for **The League**._

## Getting started

1.  Install dependencies.

    ```bash
    npm i
    ```

2.  Run the server, should start on port 3000.

    Production:

    ```bash
    npm start
    ```

    Development:

    ```bash
    npm run dev
    ```

3.  Make a `GET` request to the server with the name of the file as the url parameter. For example:

    ```
    http://localhost:3000/adventures-of-sherlock-holmes
    ```

**Useful Routes:**

1.  Testing

    ```bash
    npm run test
    ```

## Data Collected

1.  title
2.  author
3.  created
4.  updated
5.  language
6.  name
7.  filePath
8.  chapters
9.  wordCount
10. uniqueWords
    a.  count
    b.  topTen (unique words by frequency)
    c.  topFifty (unique words by frequency)
11. content
    a.  string (string format of the book)
    b.  array (an array of individual lines in the book)

## Contributors

-   [Holly Springsteen](https://www.linkedin.com/in/hhspringsteen/)
