'use strict';

/**
 * This test is to ensure that the book controller is fetching all of the required data.
 *
 * @author Holly Springsteen
 */

// Packages
const assert = require('chai').assert;

// Files
const {parseBook} = require('../controllers/bookController');

/**
 * The expected content to be returned from the parser.
 *
 * @enum {object}
 */
const expectedContent = {
  title: 'The Adventures of Sherlock Holmes',
  author: 'Arthur Conan Doyle',
  created: 'November 29, 2002',
  updated: 'April 18, 2011 [EBook #1661]',
  language: 'English',
  name: 'adventures-of-sherlock-holmes',
  filePath: 'books/adventures-of-sherlock-holmes.txt',
  chapters: [
    'I. A Scandal in Bohemia',
    'II. The Red-headed League',
    'III. A Case of Identity',
    'IV. The Boscombe Valley Mystery',
    'V. The Five Orange Pips',
    'VI. The Man with the Twisted Lip',
    'VII. The Adventure of the Blue Carbuncle',
    'VIII. The Adventure of the Speckled Band',
    'IX. The Adventure of the Engineer\'s Thumb',
    'X. The Adventure of the Noble Bachelor',
    'XI. The Adventure of the Beryl Coronet',
    'XII. The Adventure of the Copper Beeches',
  ],
  words: 108969,
  uniqueWords: 7640,
  topTen: [
    'the',
    'and',
    'i',
    'to',
    'of',
    'a',
    'in',
    'that',
    'it',
    'you',
  ],
  topFifty: [
    'the',
    'and',
    'i',
    'to',
    'of',
    'a',
    'in',
    'that',
    'it',
    'you',
    'he',
    'was',
    'his',
    'is',
    'my',
    'have',
    'with',
    'as',
    'had',
    'at',
    'which',
    'for',
    'not',
    'but',
    'be',
    'me',
    'we',
    'this',
    'there',
    'from',
    'said',
    'upon',
    'so',
    'him',
    'her',
    'she',
    'all',
    'your',
    'very',
    'no',
    'been',
    'on',
    'what',
    'one',
    'by',
    'then',
    'are',
    'were',
    'an',
    'would',
  ],
};

/**
 * The name of the file to be accessed.
 *
 * @enum {string}
 */
const filename = 'adventures-of-sherlock-holmes';

// Test the functionality
describe('bookParser', () => {
  describe('fetch book content', () => {
    it('should fetch and parse the book content', function* () {
      const bookContent = yield parseBook(filename);

      assert.isNotNull(bookContent);
      assert.isDefined(bookContent);
    });
  });

  describe('verify data', () => {
    it('should retrieve the correct informational data', function* () {
      const bookContent = yield parseBook(filename);

      assert.equal(bookContent.title, expectedContent.title);
      assert.equal(bookContent.author, expectedContent.author);
      assert.equal(bookContent.created, expectedContent.created);
      assert.equal(bookContent.updated, expectedContent.updated);
      assert.equal(bookContent.language, expectedContent.language);
      assert.equal(bookContent.name, expectedContent.name);
      assert.equal(bookContent.filePath, expectedContent.filePath);
      assert.deepEqual(bookContent.chapters, expectedContent.chapters);
      assert.equal(bookContent.wordCount, expectedContent.wordCount);
      assert.equal(bookContent.uniqueWords.count, expectedContent.uniqueWords.count);
      assert.deepEqual(bookContent.uniqueWords.topTen, expectedContent.uniqueWords.topTen);
      assert.deepEqual(bookContent.uniqueWords.topFifty, expectedContent.uniqueWords.topFifty);
    });
  });
});