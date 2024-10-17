const { nanoid } = require('nanoid');
const { timestamp } = require('./helper');

const Book = {
  data: [],
  all() {
    return this.data
  },
  detail(id) {
    const book = this.data.find((book) => book.id === id);
    return book ? {...book} : null;
  },
  exists(id) {
    const book = this.data.find((book) => book.id === id);
    return !!book;
  },
  add(book) {
    const id = nanoid();
    const currentTime = timestamp();
    const newBook = {
      ...book,
      id,
      insertedAt: currentTime,
      updatedAt: currentTime
    }
    this.data = [...this.data, newBook];

    if (!this.exists(id)) throw new Error('Terjadi kesalahan saat menambahkan ke database');

    return newBook;
  },
  update(id, updatedBook) {
    let newBook = null;
    this.data = this.data.map((book) => {
      if (book.id === id) {
        newBook = {...book, ...updatedBook};
        return newBook;
      }
      return book;
    });

    return newBook;
  },
  delete(id) {
    let deletedBook = null;
    this.data = this.data.filter((book) => {
      if (book.id === id) {
        deletedBook = book;
        return false;
      }
      return true;
    });

    return deletedBook;
  }
};

module.exports = Book;