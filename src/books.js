const { nanoid } = require('nanoid');
const { timestamp } = require('./helper');

const Book = {
  data: [],
  all() {
    return this.data
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
  }
};

module.exports = Book;