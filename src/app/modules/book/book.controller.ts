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
    status: httpStatus.OK,
    message: 'Books retrieved successfully',
    data: result,
  })
})

const getSingleBook = catchAsync(async (req, res) => {
  const { bookId } = req.params

  const result = await BookServices.getSingleBookFromDb(bookId)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book retrieved successfully',
    data: result,
  })
})

const updateBook = catchAsync(async (req, res) => {
  const { bookId } = req.params

  const result = await BookServices.updateBookIntoDb(bookId, req.body)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book updated successfully',
    data: result,
  })
})

const deleteBook = catchAsync(async (req, res) => {
  const { bookId } = req.params

  const result = await BookServices.deleteBookFromDb(bookId)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book successfully deleted',
    data: result,
  })
})

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
}
