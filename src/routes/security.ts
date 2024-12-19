import { saveApiKey } from '@/db'
import { generateApiKey } from '@/security'
import { ipWhitelistMiddleware } from '@/security/authMiddleware'
import { Router, type Response, type Request } from 'express'

export const securityRouter = Router()

securityRouter.get(
  '/generate',
  ipWhitelistMiddleware,
  async (req: Request, res: Response) => {
    const apiKey = generateApiKey()
    const apiKeyId = await saveApiKey(apiKey)

    res.json({ key: apiKey, id: apiKeyId })
  },
)
