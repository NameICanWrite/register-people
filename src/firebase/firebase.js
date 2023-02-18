import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore} from "firebase/firestore";
import {ref, uploadBytes, getStorage, getDownloadURL} from "firebase/storage"
import {v4} from 'uuid'



const firebaseConfig = {
  apiKey: "AIzaSyB8YOOsNA6qsPgMIo1B3OLAIN1Q4EFqF_8",
  authDomain: "register-people-f7a8c.firebaseapp.com",
  projectId: "register-people-f7a8c",
  storageBucket: "register-people-f7a8c.appspot.com",
  messagingSenderId: "825768098462",
  appId: "1:825768098462:web:adc0455ebb8da684bd998f",
  measurementId: "G-ML1FZJKP3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export async function uploadAvatarToFirebase(avatar) {
  const imageRef = ref(storage, `avatars/${avatar.name + v4()}`)
  await uploadBytes(imageRef, avatar)
  const url = await getDownloadURL(imageRef)
  console.log('avatarurl = ' + url)
  return url
}

export async function registerUser({name, surname, email, phone, birthDate, avatar}) {
  console.log('registering...')
  const url = await uploadAvatarToFirebase(avatar)
  const timestamp =  Date.now()
  await addDoc(collection(db, "users"), {
    name,
    surname,
    email,
    phone,
    birthDate,
    avatar: url,
    timestamp
  })
  console.log('new user added')
  return {name, surname, email, phone, birthDate, avatar: url, timestamp}
}

export async function getAllUsers() {
  let querySnapshot = await getDocs(collection(db, 'users'))
  const users = []
  
  querySnapshot.forEach(user => users.push(user.data()))

  return users
}

