import { BorrowRecord } from '@prisma/client'
import prisma from '../../utils/prisma'

const borrowBookIntoDb = async (payload: BorrowRecord) => {
  await prisma.book.findUniqueOrThrow({
    where: {
      bookId: payload.bookId,
    },
  })

  await prisma.member.findUniqueOrThrow({
    where: {
      memberId: payload.memberId,
    },
  })

  const result = await prisma.borrowRecord.create({
    data: payload,
  })

  return result
}

export const BorrowServices = {
  borrowBookIntoDb,
}
