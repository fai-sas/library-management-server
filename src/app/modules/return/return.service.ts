import prisma from '../../utils/prisma'

const returnBookIntoDb = async (borrowId: string) => {
  await prisma.borrowRecord.findUniqueOrThrow({
    where: {
      borrowId,
    },
  })
}

export const ReturnServices = {
  returnBookIntoDb,
}
