import { Router } from 'express'
import { AuthorControllers } from '../modules/author/author.controller'
import { BookRoutes } from '../modules/book/book.routes'

const router = Router()

const moduleRoutes = [
  // {
  //   path: '/author',
  //   routes: AuthorControllers,
  // },
  {
    path: '/books',
    routes: BookRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
