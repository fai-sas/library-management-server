import express from 'express'
import { BorrowControllers } from './borrow.controller'

const router = express.Router()

router.post('/', BorrowControllers.borrowBook)

router.get('/overdue', BorrowControllers.getOverdueBorrowList)

export const BorrowRoutes = router
