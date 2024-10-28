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
app.use(cors({origin: '*'}));
app.use(express.json())
app.use(cookieParser())
app.use('/user',userRouter)
app.use('/credit',creditRouter)
 
app.listen(port, () => console.log(`Server running on port ${port}`))