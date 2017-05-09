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

## Data Returned

```javascript
{
  title,
  author,
  created,
  updated,
  language,
  file: {
    name,
    path,
  },
  chapters,
  // Count of all words in file
  wordCount,
  uniqueWords: {
    count,
    // Unique words by frequency
    topTen,
    topFifty,
  },
  content: {
    // String format of the book
    string,
    // An array of individual lines in the book
    array,
  },
}
```

## Contributors

-   [Holly Springsteen](https://www.linkedin.com/in/hhspringsteen/)
