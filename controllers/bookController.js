'use strict';

/**
 * Read files and access the content.
 *
 * @author Holly Springsteen
 */

const fs = require('fs');
const englishWords = new Set(require('an-array-of-english-words'));

/**
 * Gather the unique words from the string and sort them based on frequency.
 *
 * @param {string[]} words An array of all words from the content.
 * @return {string[]} Returns an array of the unique words sorted by frequency.
 */
function getSortedUniqueWords(words) {
  const frequencies = {};

  // Loop through the words to count the frequency of each word
  for (const word of words) {
    // Ensure that the word to be counted is a valid word (avoid things like 's' from being added)
    if (englishWords.has(word)) {
      frequencies[word] = frequencies[word] || 0;
      frequencies[word]++;
    }
  }

  // Get only the unique words from the frequency counts
  const uniqueWords = Object.keys(frequencies);

  // Sort the unique words based on the frequency of the words
  return uniqueWords.sort((a, b) => {
    return frequencies[b] - frequencies[a];
  });
}

/**
 * Read files and access the content.
 *
 * @param {string} fileName The name of the file to be accessed.
 * @returns {string} Returns the contents of the file being accessed.
 */
function parseBook(fileName) {
  const filePath = `books/${fileName}.txt`;

  // File content as string
  const content = fs.readFileSync(filePath, {
    encoding: 'utf8',
  });

  // Array for each new line
  const contentArray = content.toString().split('\r\n');

  // Ensure words are counted the same regardless of case & only count words
  const wordRegex = /\b[^\d\W]+\b/g;
  const words = content.toLowerCase().match(wordRegex);

  const uniqueWords = getSortedUniqueWords(words);

  const bookData = {
    title: '',
    author: '',
    created: '',
    updated: '',
    language: '',
    name: fileName,
    filePath,
    chapters: [],
    wordCount: words.length,
    uniqueWords: {
      count: uniqueWords.length,
      topTen: uniqueWords.slice(0, 10),
      topFifty: uniqueWords.slice(0, 50),
    },
    content: {
      string: content,
      array: contentArray,
    },
  };

  // All pertinent information about the book should be in the first 100 lines
  for (let index = 0; index < 100; index++) {
    const line = contentArray[index];

    if (line.indexOf('Title: ') !== -1) {
      bookData.title = line.replace('Title: ', '');
    }
    if (line.indexOf('Author: ') !== -1) {
      bookData.author = line.replace('Author: ', '');
    }
    if (line.indexOf('First Posted: ') !== -1) {
      bookData.created = line.replace('First Posted: ', '');
    }
    if (line.indexOf('Posting Date: ') !== -1) {
      bookData.updated = line.replace('Posting Date: ', '');
    }
    if (line.indexOf('Language: ') !== -1) {
      bookData.language = line.replace('Language: ', '');
    }

    const romanNumeralRegex = /^(?:X(?:X(?:V(?:I(?:I?I)?)?|X(?:I(?:I?I)?)?|I(?:[VX]|I?I)?)?|V(?:I(?:I?I)?)?|I(?:[VX]|I?I)?)?|V(?:I(?:I?I)?)?|I(?:[VX]|I?I)?)(?:\. )/g;
    const trimmedLine = line.trim();

    if (romanNumeralRegex.test(trimmedLine)) {
      bookData.chapters.push(trimmedLine);
    }
  }

  return bookData;
}

module.exports = {
  parseBook,
};