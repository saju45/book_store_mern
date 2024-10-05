const express = require("express");
const cors = require("cors");
const connectDb = require("./conn/conn.js");
const userRouter = require("./routes/user");
const bookRouter = require("./routes/book.js");
const favouriteRouter = require("./routes/favourite.js");
const cartRouter = require("./routes/cart.js");
const orderRouter = require("./routes/order.js");

require("dotenv").config();

const app = express();

connectDb();
app.get("/", (req, res) => {
  res.send("HI I am book store app create me shanawaj hossain saju");
});

app.use(cors());
app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1", bookRouter);
app.use("/api/v1", favouriteRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);

//create port
app.listen(process.env.PORT, () => {
  console.log(`server is runing on port : ${process.env.PORT}`);
});
