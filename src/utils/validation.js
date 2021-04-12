/**
 * Validating new book data
 * @param {*} payload Request payload
 * @returns {*} validation result
 */
const validateNewBook = (payload) => {
    if (typeof payload.name === 'undefined') {
        return { isFailed: true, message: 'Gagal menambahkan buku. Mohon isi nama buku' }
    }
    if (typeof payload.year === 'undefined') {
        return { isFailed: true, message: 'Gagal menambahkan buku. Mohon isi tahun buku' }
    }
    if (typeof payload.author === 'undefined') {
        return { isFailed: true, message: 'Gagal menambahkan buku. Mohon isi author buku' }
    }
    if (typeof payload.summary === 'undefined') {
        return { isFailed: true, message: 'Gagal menambahkan buku. Mohon isi summary buku' }
    }
    if (typeof payload.publisher === 'undefined') {
        return { isFailed: true, message: 'Gagal menambahkan buku. Mohon isi publisher buku' }
    }
    if (typeof payload.pageCount === 'undefined') {
        return { isFailed: true, message: 'Gagal menambahkan buku. Mohon isi jumlah halaman buku' }
    }
    if (typeof payload.readPage === 'undefined') {
        return { isFailed: true, message: 'Gagal menambahkan buku. Mohon isi halaman yang telah di baca' }
    }
    if (typeof payload.reading === 'undefined') {
        return { isFailed: true, message: 'Gagal menambahkan buku. Mohon isi status baca (reading)' }
    }
    if (payload.readPage > payload.pageCount) {
        return { isFailed: true, message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' }
    }
    return { isFailed: false, message: 'Validasi success' }
}

/**
 * Validating book data to edit
 * @param {*} payload Request payload
 * @returns {*} validation result
 */
const validateEditBook = (payload) => {
    if (typeof payload.name === 'undefined') {
        return { isFailed: true, message: 'Gagal memperbarui buku. Mohon isi nama buku' }
    }
    if (typeof payload.year === 'undefined') {
        return { isFailed: true, message: 'Gagal memperbarui buku. Mohon isi tahun buku' }
    }
    if (typeof payload.author === 'undefined') {
        return { isFailed: true, message: 'Gagal memperbarui buku. Mohon isi author buku' }
    }
    if (typeof payload.summary === 'undefined') {
        return { isFailed: true, message: 'Gagal memperbarui buku. Mohon isi summary buku' }
    }
    if (typeof payload.publisher === 'undefined') {
        return { isFailed: true, message: 'Gagal memperbarui buku. Mohon isi publisher buku' }
    }
    if (typeof payload.pageCount === 'undefined') {
        return { isFailed: true, message: 'Gagal memperbarui buku. Mohon isi jumlah halaman buku' }
    }
    if (typeof payload.readPage === 'undefined') {
        return { isFailed: true, message: 'Gagal memperbarui buku. Mohon isi halaman yang telah di baca' }
    }
    if (typeof payload.reading === 'undefined') {
        return { isFailed: true, message: 'Gagal memperbarui buku. Mohon isi status baca (reading)' }
    }
    if (payload.readPage > payload.pageCount) {
        return { isFailed: true, message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' }
    }
    return { isFailed: false, message: 'Validasi success' }
}

module.exports = { validateNewBook, validateEditBook }
