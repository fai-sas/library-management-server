import express from 'express'
import { MemberControllers } from './member.controller'

const router = express.Router()

router.post('/', MemberControllers.createMember)

router.get('/', MemberControllers.getAllMembers)

router.get('/:memberId', MemberControllers.getSingleMember)

router.put('/:memberId', MemberControllers.updateMember)

export const MemberRoutes = router
