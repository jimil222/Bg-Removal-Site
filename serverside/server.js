import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './Routes/userRoutes.js'

//App conifg
const port = process.env.PORT||4000 
const app = express()

// Initialize middlewares 
app.use(express.json())
app.use(cors())
await connectDB()

//Api routes 
app.get('/',(req,res)=> res.send("Api is working"))
app.use('/api/user',userRouter)

app.listen(port,()=>console.log("Server running on port "+port))