import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDb from "./config/mongodb.js";

const app = express();
const port = process.env.PORT || 4000;
connectDb();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.get('/',(req,res,next)=>{
            res.send('nikal lawde ');
})
app.listen(port, () => {
  console.log(` Server started at http://localhost:${port}`);
});
