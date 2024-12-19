import { randomBytes } from 'crypto'

export const generateApiKey = () => {
  const randomPart = randomBytes(12).toString('hex')
  return `smartbus-${randomPart}`
}
