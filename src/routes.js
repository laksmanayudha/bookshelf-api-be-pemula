const handler = require('./handler');
const validator = require('./validator');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handler.addBook,
    options: {
      validate: validator.addBookValidator
    }
  },
  {
    method: 'GET',
    path: '/books',
    handler: handler.getAllBook,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: handler.getBookDetail,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: handler.updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: handler.deleteBook,
  },
];

module.exports = routes;