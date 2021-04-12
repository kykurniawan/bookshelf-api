const handler = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: handler.addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: handler.getAllBooksHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: handler.getBookByIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: () => { }
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: () => { }
    }
]

module.exports = routes
