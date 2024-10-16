const Joi = require('joi');

const clienErrorResponse = (request, h, err) => {
  return h.response({
    status: 'fail',
    message: err.message
  }).code(400).takeover();
}

const addBookValidator = {
  payload: Joi.object({
    name: Joi.string()
      .required()
      .messages({
        'any.required': 'Gagal menambahkan buku. Mohon isi nama buku'
      }),
    year: Joi.number().required(),
    author: Joi.string().required(),
    summary: Joi.string().required(),
    publisher: Joi.string().required(),
    pageCount: Joi.number().required(),
    readPage: Joi.number()
      .required()
      .when('pageCount', {
        is: Joi.number().valid(Joi.ref('readPage')),
        then: Joi.number(),
        otherwise: Joi.number().less(Joi.ref('pageCount'))
      })
      .messages({
        'number.less': 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      }),
    reading: Joi.boolean().required()
  }),
  failAction: clienErrorResponse
}

module.exports = { addBookValidator };