import { Member } from '@prisma/client'
import prisma from '../../utils/prisma'

const createMemberIntoDb = async (payload: Member) => {
  const result = await prisma.member.create({
    data: payload,
  })

  return result
}

const getAllMembersFromDb = async () => {
  const result = await prisma.member.findMany()

  return result
}

const getSingleMemberFromDb = async (memberId: string) => {
  const result = await prisma.member.findUniqueOrThrow({
    where: {
      memberId,
    },
  })

  return result
}

const updateMemberIntoDb = async (
  memberId: string,
  payload: Partial<Member>
) => {
  await prisma.member.findUniqueOrThrow({
    where: {
      memberId,
    },
  })

  const result = await prisma.$transaction(async (transactionClient) => {
    const updatedMember = await transactionClient.member.update({
      where: {
        memberId,
      },
      data: payload,
    })
    return updatedMember
  })

  return result
}

export const MemberServices = {
  createMemberIntoDb,
  getAllMembersFromDb,
  getSingleMemberFromDb,
  updateMemberIntoDb,
}
