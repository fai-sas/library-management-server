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

const getOverdueBorrowListFromDb = async () => {
  const currentDate = new Date()

  const overdueBooks = await prisma.borrowRecord.findMany({
    where: {
      returnDate: null,
      borrowDate: {
        lte: new Date(currentDate.setDate(currentDate.getDate() - 14)),
      },
    },
    include: {
      Book: {
        select: {
          title: true,
        },
      },
      Member: {
        select: {
          name: true,
        },
      },
    },
  })

  const result = overdueBooks.map((record) => {
    const overdueDays =
      Math.floor(
        (currentDate.getTime() - new Date(record.borrowDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) - 14
    return {
      borrowId: record.borrowId,
      bookTitle: record.Book.title,
      borrowerName: record.Member.name,
      overdueDays: overdueDays > 0 ? overdueDays : 0,
    }
  })

  return result
}

export const BorrowServices = {
  borrowBookIntoDb,
  getOverdueBorrowListFromDb,
}
