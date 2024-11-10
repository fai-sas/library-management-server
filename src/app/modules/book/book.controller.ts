import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookServices } from './book.service'
import httpStatus from 'http-status'

const createBook = catchAsync(async (req, res) => {
  const result = await BookServices.createBookIntoDb(req.body)

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: 'Book created successfully',
    data: result,
  })
})

const getAllBooks = catchAsync(async (req, res) => {
  const result = await BookServices.getAllBooksFromDb()

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: 'Book created successfully',
    data: result,
  })
})

export const BookControllers = {
  createBook,
  getAllBooks,
}
