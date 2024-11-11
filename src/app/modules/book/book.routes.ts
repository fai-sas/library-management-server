import express from 'express'
import { BookControllers } from './book.controller'

const router = express.Router()

router.post('/', BookControllers.createBook)

router.get('/', BookControllers.getAllBooks)

router.get('/:bookId', BookControllers.getSingleBook)

router.put('/:bookId', BookControllers.updateBook)

router.delete('/:bookId', BookControllers.deleteBook)

router.post('/borrow', BookControllers.borrowBook)

router.post('/return', BookControllers.returnBook)

export const BookRoutes = router
