import express from 'express'
import { AuthorControllers } from './author.controller'

const router = express.Router()

router.post('/create-author', AuthorControllers.createAuthor)

export const AuthorRoutes = router
