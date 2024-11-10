import { Book } from '@prisma/client'
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

export const BookServices = {
  createBookIntoDb,
  getAllBooksFromDb,
  getSingleBookFromDb,
}
