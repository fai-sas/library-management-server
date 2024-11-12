import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ReturnServices } from './return.service'
import httpStatus from 'http-status'

const returnBook = catchAsync(async (req, res) => {
  const { borrowId } = req.body

  const result = await ReturnServices.returnBookIntoDb(borrowId)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book returned successfully',
    data: result,
  })
})

export const ReturnControllers = {
  returnBook,
}
