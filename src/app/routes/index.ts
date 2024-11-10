import { Router } from 'express'
import { BookRoutes } from '../modules/book/book.routes'
import { MemberRoutes } from '../modules/member/member.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/members',
    routes: MemberRoutes,
  },
  {
    path: '/books',
    routes: BookRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
