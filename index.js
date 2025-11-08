import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from '../server/src/routes/authRoute.js'

const app = express();

const PORT = process.env.PORT || 3008;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json({limit: "10mb"}));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

mongoose.connect(MONGO_URI, {
useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> {
    console.log(`successfully connected to ${mongoose.connection.name}✅`);

    app.listen(PORT, ()=>{
         console.log(`Server is runing`)
    });
})

.catch((err)=>{
    console.log("Failed to connect with DB:", err);
    process.exit(1);
})


// Routes are from here....
app.use('/auth', authRoutes);
