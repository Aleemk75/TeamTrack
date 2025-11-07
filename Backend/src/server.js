import express from "express"
import {dbConnect} from "./DB/mongodb.js"
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
dotenv.config();
const app = express();
const port = process.env.PORT;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect()
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err);
})

app.use("/api/auth",authRouter);

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
