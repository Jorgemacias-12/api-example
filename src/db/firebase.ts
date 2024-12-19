import { hasNullValue } from '@/utils'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_S_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const nullValues = hasNullValue(config)
if (nullValues.length > 0) {
  throw new Error(`Firebase config has the follwing null props: ${nullValues}`)
}

const app = initializeApp(config)

export const db = getFirestore(app)
