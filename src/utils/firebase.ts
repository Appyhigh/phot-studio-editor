import { Analytics, getAnalytics } from "firebase/analytics"
import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBeXUKwxjXFzzv4yH9bwCx-yzv_F-ANo7k",
  authDomain: "phot-ai.firebaseapp.com",
  projectId: "phot-ai",
  storageBucket: "phot-ai.appspot.com",
  messagingSenderId: "49948541054",
  appId: "1:49948541054:web:a968582ebd788e7672582f",
  measurementId: "G-YG6QRMYN3Z",
}

let analytics: Analytics

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = () => getAuth(app)

if (app.name && typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

export { app, analytics, auth }
