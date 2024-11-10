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

const getAllMembers = catchAsync(async (req, res) => {
  const result = await MemberServices.getAllMembersFromDb()

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Members retrieved successfully',
    data: result,
  })
})

const getSingleMember = catchAsync(async (req, res) => {
  const { memberId } = req.params

  const result = await MemberServices.getSingleMemberFromDb(memberId)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Member retrieved successfully',
    data: result,
  })
})

const updateMember = catchAsync(async (req, res) => {
  const { memberId } = req.params

  const result = await MemberServices.updateMemberIntoDb(memberId, req.body)

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'Member updated successfully',
    data: result,
  })
})

export const MemberControllers = {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
}
