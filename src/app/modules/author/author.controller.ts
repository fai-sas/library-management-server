import { Request, Response } from 'express'

const createAuthor = async (req, res) => {
  console.log('Author')
}

export const AuthorControllers = {
  createAuthor,
}
