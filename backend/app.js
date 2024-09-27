const express = require("express");
const connectDb = require("./conn/conn.js");
const userRouter = require("./routes/user");
require("dotenv").config();

const app = express();

connectDb();
app.get("/", (req, res) => {
  res.send("HI I am book store app create me shanawaj hossain saju");
});

app.use(express.json());
app.use("/api/v1", userRouter);

//create port
app.listen(process.env.PORT, () => {
  console.log(`server is runing on port : ${process.env.PORT}`);
});
