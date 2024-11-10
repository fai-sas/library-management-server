import { Book } from '@prisma/client'
import prisma from '../../utils/prisma'

const createBookIntoDb = async (payload: Book) => {
  const result = await prisma.book.create({
    data: payload,
  })

  return result
}

export const BookServices = {
  createBookIntoDb,
}
