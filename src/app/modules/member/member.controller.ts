import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { MemberServices } from './member.service'

const createMember = catchAsync(async (req, res) => {
  const result = await MemberServices.createMemberIntoDb(req.body)

  sendResponse(res, {
    success: true,
    status: httpStatus.CREATED,
    message: 'Member created successfully',
    data: result,
  })
})
export const MemberControllers = {
  createMember,
}
