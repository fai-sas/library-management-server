import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BorrowServices } from './borrow.service'

const borrowBook = catchAsync(async (req, res) => {
  const result = await BorrowServices.borrowBookIntoDb(req.body)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Book borrowed successfully',
    data: result,
  })
})

export const BorrowControllers = {
  borrowBook,
}
