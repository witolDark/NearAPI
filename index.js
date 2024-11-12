import express from 'express'
import mongoose from 'mongoose'
import eventRouter from "./routes/EventRouter.js"
import userRouter from "./routes/UserRouter.js"

const app = express()
const DB_URL = 'mongodb+srv://witold:Loginlogin123@cluster0.svfss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const port = 5000

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', eventRouter)

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(port, () => console.log(`Server running on port ${port}`))
    } catch (e) {
        console.log(e)
    }
}

await startApp()