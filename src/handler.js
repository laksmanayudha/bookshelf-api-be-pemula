const Book = require('./books');
const { ClientError } = require('./error');

const addBook = (request, h) => {
  try {
    const payload = request.payload;

    // set finished value
    payload.finished = payload.pageCount === payload.readPage;

    // add book
    const book = Book.add(payload);

    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: book.id
      }
    }).code(201);
  } catch (error) {
    return h.response({
      status: 'fail',
      message: error.message,
    }).code(500);
  }
};

const getAllBook = (request, h) => {
  try {
    // get all book
    const books = Book.all().map(({ id, name, publisher }) => ({
      id,
      name,
      publisher
    }));

    return h.response({
      status: 'success',
      data: { books }
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'fail',
      message: error.message,
    }).code(500);
  }
};

const getBookDetail = (request, h) => {
  try {
    // get specific book
    const id = request.params.id;
    const book = Book.detail(id);

    // check if found
    if (!book) throw new ClientError('Buku tidak ditemukan', 404);

    return h.response({
      status: 'success',
      data: { book }
    }).code(200);
  } catch (error) {
    if (error instanceof ClientError) {
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(error.code);
    }

    return h.response({
      status: 'fail',
      message: error.message,
    }).code(500);
  }
};

const updateBook = (request, h) => {
  try {
    const id = request.params.id;
    const payload = request.payload;

    // check if book is exists
    if (!Book.exists(id))
      throw new ClientError('Gagal memperbarui buku. Id tidak ditemukan', 404);

    // update the new book data
    Book.update(id, payload);

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    }).code(200);
  } catch (error) {
    if (error instanceof ClientError) {
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(error.code);
    }

    return h.response({
      status: 'fail',
      message: error.message,
    }).code(500);
  }
};

const deleteBook = (request, h) => {
  try {
    const id = request.params.id;

    // check if book is exists
    if (!Book.exists(id))
      throw new ClientError('Buku gagal dihapus. Id tidak ditemukan', 404);

    // delete the book data
    Book.delete(id);

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    }).code(200);
  } catch (error) {
    if (error instanceof ClientError) {
      return h.response({
        status: 'fail',
        message: error.message,
      }).code(error.code);
    }

    return h.response({
      status: 'fail',
      message: error.message,
    }).code(500);
  }
};

module.exports = {
  addBook,
  getAllBook,
  getBookDetail,
  updateBook,
  deleteBook
};