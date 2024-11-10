import { Router } from 'express'
import { AuthorControllers } from '../modules/author/author.controller'

const router = Router()

const moduleRoutes = [
  {
    path: '/author',
    routes: AuthorControllers,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
