import { Router } from 'express'
import { BookRoutes } from '../modules/book/book.routes'
import { MemberRoutes } from '../modules/member/member.routes'
import { BorrowRoutes } from '../modules/borrow/borrow.routes'
import { ReturnRoutes } from '../modules/return/return.routes'

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
  {
    path: '/borrow',
    routes: BorrowRoutes,
  },
  {
    path: '/return',
    routes: ReturnRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
