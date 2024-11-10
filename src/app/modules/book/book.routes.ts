import express from 'express'
import { BookControllers } from './book.controller'

const router = express.Router()

router.post('/', BookControllers.createBook)

router.get('/', BookControllers.getAllBooks)

export const BookRoutes = router
