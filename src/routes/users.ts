import { validateApiKey } from '@/security/authMiddleware'
import { Router, type Request, type Response } from 'express'

export const userRouter = Router()

userRouter.get(
  '/users',
  validateApiKey,
  async (req: Request, res: Response) => {
    res.json({ message: 'Greetings from userRouter protected by api-key' })
  },
)
