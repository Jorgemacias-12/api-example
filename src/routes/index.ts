import { Router } from 'express'
import { securityRouter } from './security'
import { userRouter } from './users'

export const routes = Router()

routes.use(securityRouter)
routes.use(userRouter)
