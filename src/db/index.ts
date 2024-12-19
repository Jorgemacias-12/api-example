import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from './firebase'

export const saveApiKey = async (key: string) => {
  const apiKeysCollection = collection(db, 'apiKeys')

  const docRef = await addDoc(apiKeysCollection, {
    key,
    createdAt: Timestamp.now(),
    isActive: true,
  })

  return docRef.id
}
