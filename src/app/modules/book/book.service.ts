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

const returnBookIntoDb = async (borrowId: string) => {
  await prisma.borrowRecord.findUniqueOrThrow({
    where: {
      borrowId,
    },
  })
}

export const BookServices = {
  createBookIntoDb,
  getAllBooksFromDb,
  getSingleBookFromDb,
  updateBookIntoDb,
  deleteBookFromDb,
  borrowBookIntoDb,
  returnBookIntoDb,
}
