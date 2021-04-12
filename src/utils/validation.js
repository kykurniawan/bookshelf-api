const validateNewBook = (payload) => {
    if (typeof payload.name === 'undefined') {
        return { isFailed: true, message: 'Gagal menambahkan buku. Mohon isi nama buku' }
    }
    if (payload.readPage > payload.pageCount) {
        return { isFailed: true, message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' }
    }
    return { isFailed: false, message: 'Validasi success' }
}

const validateEditBook = (payload) => {
    if (typeof payload.name === 'undefined') {
        return { isFailed: true, message: 'Gagal memperbarui buku. Mohon isi nama buku' }
    }
    if (payload.readPage > payload.pageCount) {
        return { isFailed: true, message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' }
    }
    return { isFailed: false, message: 'Validasi success' }
}

module.exports = { validateNewBook, validateEditBook }
