import { Member } from '@prisma/client'
import prisma from '../../utils/prisma'

const createMemberIntoDb = async (payload: Member) => {
  const result = await prisma.member.create({
    data: payload,
  })

  return result
}

export const MemberServices = {
  createMemberIntoDb,
}
