import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDb from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
const app = express();
const port = process.env.PORT || 4000;
connectDb();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.get('/',(req,res,next)=>{
            res.send('nikal lawde ');
})
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.listen(port, () => {
  console.log(` Server started at http://localhost:${port}`);
});

