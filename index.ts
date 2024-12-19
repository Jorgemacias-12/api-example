import express, { type Request, type Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import fs from 'fs'
import https from 'https'
import http from 'http'

const isDev = process.env.NODE_ENV !== 'production'

const app = express()
const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(cors())
app.use(morgan('combined'))

app.use('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello world!' })
})

let server

if (!isDev) {
  const keyPath = process.env.KEY_PATH as string
  const certPath = process.env.CERT_PATH as string

  let key, cert

  try {
    key = fs.readFileSync(keyPath)
    cert = fs.readFileSync(certPath)
  } catch (error: any) {
    throw new Error(`Error loading certificates: ${error.message}`)
  }

  const credentials = { key, cert }

  server = https.createServer(credentials, app)
  server.listen(PORT, () => {
    console.log(`Running HTTPS server on port ${PORT}`)
  })
} else {
  server = http.createServer(app)
  server.listen(PORT, () => {
    console.log(`Running HTTP server on port ${PORT}`)
  })
}
