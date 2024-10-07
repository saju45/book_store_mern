const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData?._id });
      const orderDataFromDb = await newOrder.save();

      //saveing order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb?._id },
      });

      //cleaning cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData?._id },
      });
    }

    return res.json({
      status: "Success",
      message: "Order Place Successfully",
    });
  } catch (error) {
    return res.status(500).json({ messsage: "An error occurred" });
  }
});

//get user orders
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const orderData = userData?.orders.reverse();

    return res.json({
      status: "Success",
      data: orderData,
    });
  } catch (error) {
    return res.status(500).json({ messsage: "An error occurred" });
  }
});

//get all orders
router.get("/get-all-order", authenticateToken, async (req, res) => {
  try {
    const orderData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: 1 });

    return res.json({
      status: "Success",
      data: orderData,
    });
  } catch (error) {
    return res.status(500).json({ messsage: "An error occurred" });
  }
});

//update order status ->admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndUpdate(id, { status: req.body.status });

    return res.json({
      status: "Success",
      message: "Status updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({ messsage: "An error occurred" });
  }
});

module.exports = router;
