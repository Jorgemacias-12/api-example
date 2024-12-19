import { db } from '@/db/firebase'
import {
  type Request,
  type Response,
  type NextFunction,
  type RequestHandler,
} from 'express'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

const allowedIPs = new Set([
  '192.168.100.7',
  '127.0.0.1',
  'localhost',
  '::1',
  '::ffff:127.0.0.1',
])

export const ipWhitelistMiddleware: RequestHandler = (req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress

  if (!clientIP || !allowedIPs.has(clientIP.toString())) {
    res.status(403).json({ error: 'Access denied: IP not allowed' })
    return
  }

  next()
}

export const validateApiKey: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const apiKey = req.headers['x-api-key']

    if (!apiKey) {
      res.status(401).json({ error: 'API key is required' })
      return
    }

    const keyCollection = collection(db, 'apiKeys')
    const q = query(keyCollection, where('key', '==', apiKey))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      res.status(403).json({ error: 'Invalid API key' })
      return
    }

    const keyData = querySnapshot.docs[0].data()

    if (!keyData.isActive) {
      res.status(403).json({ error: 'API key is inactive' })
      return
    }

    next()
  } catch (error: any) {
    console.error('Error validating API Key:', error)
    res.status(500).json({ error: `Internal Server Error: ${error}` })
  }
}
