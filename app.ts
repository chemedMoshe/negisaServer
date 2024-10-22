import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './src/config/dbLayer'
import userRouter from './src/routers/user.router'
import creditRouter from './src/routers/creditRouter'
const app = express()
const cors = require('cors')
dotenv.config()

connectDB()
const port = process.env.PORT || 3000
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use('/user',userRouter)
app.use('/credit',creditRouter)
//async function  a(){await userService.updateUser({ username: 'nnegisa', personalnumber: 12234567890 },"6711a73894f6fa7b49de25aa")}
//a().then(()=>{ 
app.listen(3000, () => console.log(`Server running on port ${port}`))