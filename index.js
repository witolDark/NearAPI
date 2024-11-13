import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import eventRouter from "./src/routes/EventRouter.js"
import authRouter from "./src/routes/AuthRouter.js";

const app = express()
dotenv.config()
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', authRouter)
app.use('/api', eventRouter)


const start = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

await start()