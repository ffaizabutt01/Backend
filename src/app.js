import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//configration->middleware
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true, limit:'16kb'}));
app.use(express.static('public'));//store some file/folder in public folder and access it from outside

app.use(cookieParser());



//routes:
import userRoutes from './routes/user.routes.js';
app.use('/api/users', userRoutes);//chezy seperate krde ha is lia get ni use use kryn gy

//http://localhost:8000/api/users/register

//cloudinary[if you need to handle user profile pictures or video uploads, Cloudinary would be perfect instead of storing them locally in your public folder]...

export default app;