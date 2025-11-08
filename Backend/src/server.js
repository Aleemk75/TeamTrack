import express from "express"
import {dbConnect} from "./DB/mongodb.js"
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";
import taskRouter from "./routes/task.routes.js";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add after imports
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

dbConnect()
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err);
})

app.use("/api/auth",authRouter);
app.use("/api/admin",adminRouter);
app.use("/api",taskRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Taskify Backend!");
});


app.use((err, req, res, next) => {
    let { status = 500, message = "server error" } = err;
    res.status(status).send({message : message});
});

app.listen(port , ()=>{
    console.log("app is listening on port", port);
});
