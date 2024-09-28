const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    const userData = await User.findById(id);

    const isBookCart = userData?.cart.includes(bookid);

    if (isBookCart) {
      return res.status(200).json({ message: "Book is already cart" });
    }

    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.status(200).json({ message: "Book added to cart" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//delete book from cart
router.put("/remove-book-from-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    const userData = await User.findById(id);

    const isBookCart = userData?.cart.includes(bookid);

    if (isBookCart) {
      await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    }

    return res.status(200).json({ message: "book remove from cart" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get cart books of a particular user
router.get("/get-cart-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const userData = await User.findById(id).populate("cart");
    const cartBooks = userData.cart.reverse();
    return res.json({
      status: "Success",
      data: cartBooks,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
