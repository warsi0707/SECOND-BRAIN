import express from 'express'
import userRouter from './routes/userRouter.js'
import ConnectDB from './config/DatabaseConnection.js'
import { MONGO_URL } from './config/envConfig.js'
import contentRouter from './routes/contentRouter.js'
import cors from 'cors'


const app = express()
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/content", contentRouter)


const main =async()=>{
    app.listen(3000)
    console.log("App lisitng on port 3000")
    await ConnectDB()
}
main()