const Book = require('./books');

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
      message: `Gagal menambahkan buku. ${error.message}`,
    }).code(500);
  }
}

const getAllBook = () => {

}

const getBookDetail = () => {

}

const updateBook = () => {

}

const deleteBook = () => {

}

module.exports = {
  addBook,
  getAllBook,
  getBookDetail,
  updateBook,
  deleteBook
};