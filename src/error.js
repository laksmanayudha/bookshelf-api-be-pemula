class ClientError extends Error {
  constructor(message = '', code = 400, ...args) {
    super(message, ...args);
    this.code = code;
  }
}

class ServerError extends Error {
  constructor(message = '', code = 500, ...args) {
    super(message, ...args);
    this.code = code;
  }
}

module.exports = { ClientError, ServerError };