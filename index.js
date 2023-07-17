const express = require("express");
require("dotenv").config();
const connection = require("./connection/db");
const userRoute = require("./routes/user.route");
const postRouter = require("./routes/post.route");
const auth=require("./middleware/authMiddleware")
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to social media")
})
app.use("/users",userRoute)
app.use(auth)
app.use("/posts",postRouter)


app.listen(process.env.port, async () => {
    await connection
    console.log("connected to mongodb")
})