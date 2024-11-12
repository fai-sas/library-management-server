import { Book, BorrowRecord } from '@prisma/client'
import prisma from '../../utils/prisma'

const createBookIntoDb = async (payload: Book) => {
  const result = await prisma.book.create({
    data: payload,
  })

  return result
}

const getAllBooksFromDb = async () => {
  const result = await prisma.book.findMany()

  return result
}

const getSingleBookFromDb = async (bookId: string) => {
  const result = await prisma.book.findUniqueOrThrow({
    where: {
      bookId,
    },
  })

  return result
}

const updateBookIntoDb = async (bookId: string, payload: Partial<Book>) => {
  await prisma.book.findUniqueOrThrow({
    where: {
      bookId,
    },
  })

  const result = await prisma.$transaction(async (transactionClient) => {
    const updatedBook = await transactionClient.book.update({
      where: {
        bookId,
      },
      data: payload,
    })
    return updatedBook
  })

  return result
}

const deleteBookFromDb = async (bookId: string) => {
  await prisma.book.findUniqueOrThrow({
    where: {
      bookId,
    },
  })

  await prisma.$transaction(async (transactionClient) => {
    const deletedBook = await transactionClient.book.delete({
      where: {
        bookId,
      },
    })
    return deletedBook
  })
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

export const BookServices = {
  createBookIntoDb,
  getAllBooksFromDb,
  getSingleBookFromDb,
  updateBookIntoDb,
  deleteBookFromDb,
  getOverdueBorrowListFromDb,
}
