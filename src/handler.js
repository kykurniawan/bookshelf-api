const { nanoid } = require('nanoid')
const books = require('./data/books')
const { validateNewBook, validateEditBook } = require('./utils/validation')

/**
 * Handler for adding new book item
 * @param {*} request Request object
 * @param {*} h Response toolkit
 * @returns {*} response
 */
const addBookHandler = (request, h) => {
    const id = nanoid(16)
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const validation = validateNewBook(request.payload)

    if (validation.isFailed) {
        const response = h.response({
            status: 'fail',
            message: validation.message
        })
        response.code(400)
        return response
    }

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }

    books.push(newBook)
    const isSuccess = books.filter((book) => book.id === id).length > 0
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: newBook.id
            }
        })
        response.code(201)
        return response
    }

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan'
    })
    response.code(500)
    return response
}

/**
 * Handler for getting all book items
 * @param {*} request Request object
 * @param {*} h Response toolkit
 * @returns {*} response
 */
const getAllBooksHandler = (request, h) => {
    const reading = request.query.reading
    const finished = request.query.finished
    const name = request.query.name
    let booksData = books

    if (reading !== undefined) {
        booksData = booksData.filter((book) => book.reading === (reading === '1'))
    }
    if (finished !== undefined) {
        booksData = booksData.filter((book) => book.finished === (finished === '1'))
    }
    if (name !== undefined) {
        booksData = booksData.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
    }
    const response = h.response({
        status: 'success',
        data: {
            books: booksData.map((book) => ({ id: book.id, name: book.name, publisher: book.publisher }))
        }
    })
    response.code(200)
    return response
}

/**
 * Handler for getting book item with given id
 * @param {*} request Request object
 * @param {*} h Response toolkit
 * @returns {*} response
 */
const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params

    const book = books.filter((book) => book.id === bookId)[0]

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
}

/**
 * Handler for editing book data with given id
 * @param {*} request Request object
 * @param {*} h Response toolkit
 * @returns {*} response
 */
const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params
    const book = books.filter((book) => book.id === bookId)[0]

    if (book === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        })
        response.code(404)
        return response
    }
    const validation = validateEditBook(request.payload)
    if (validation.isFailed) {
        const response = h.response({
            status: 'fail',
            message: validation.message
        })
        response.code(400)
        return response
    }
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

    const updatedAt = new Date().toISOString()

    const index = books.findIndex((book) => book.id === bookId)

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status: 'error',
        message: 'Buku gagal diperbarui'
    })
    response.code(500)
    return response
}

/**
 * Handler for deleting book item with given id
 * @param {*} request Request object
 * @param {*} h Response toolkit
 * @returns {*} response
 */
const deleteBookById = (request, h) => {
    const { bookId } = request.params
    const index = books.findIndex((book) => book.id === bookId)

    if (index === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        })
        response.code(404)
        return response
    }
    books.splice(index, 1)
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
}

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookById
}
