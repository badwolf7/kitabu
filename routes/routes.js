'use strict';

/**
 * Application routes.
 *
 * @author Holly Springsteen
 */

const express = require('express');

const {parseBook} = require('../controllers/bookController');

/**
 * Function that adds all the appropriate routes to the router object.
 *
 * @return {express.Router} The router object with all the appropriate routes already configured.
 */
function appRouter() {
  const router = new express.Router({
    caseSensitive: true,
  });

  router.get('/', (request, response) => {
    response.send('Hello World!');
  });

  router.get('/:book', (request, response) => {
    const {book} = request.params;

    const bookContent = parseBook(book);

    response.send(bookContent);
  });

  return router;
}

module.exports = {
  appRouter,
};