import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import authRoute from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import itemRoutes from './routes/item.route.js'

const app = express()

app.use(express.json())

app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', (req, res, next) => {
    console.log(`Requested file: ${req.url}`);
    next();
  }, express.static(path.join(__dirname, 'uploads')));

dotenv.config()



app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true,
 }))

connectDB()

app.use('/api/auth', authRoute)
app.use('/api/items', itemRoutes)

app.get('/', (req,res)=>{
    res.send("Hello")
})
 
const port = process.env.PORT || 4000


app.listen(port, ()=>{
    console.log("Server is responding", port)
})