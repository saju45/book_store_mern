const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");

//add book -> admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { url, title, author, price, desc, language } = req.body;
    const userData = await User.findById(id);

    if (userData?.role !== "admin") {
      return res
        .status(200)
        .json({ message: "You are not having access to perform admin work" });
    }

    const newBook = new Book({
      url,
      title,
      author,
      price,
      desc,
      language,
    });

    await newBook.save();
    return res.status(200).json({ message: "book added successfull" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

//add book -> admin
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid, adminid } = req.headers;

    const { url, title, author, price, desc, language } = req.body;
    const userData = await User.findById(adminid);

    console.log({ userData });

    if (userData?.role !== "admin") {
      return res
        .status(200)
        .json({ message: "You are not having access to perform admin work" });
    }

    const updatedBook = {
      url,
      title,
      author,
      price,
      desc,
      language,
    };

    await Book.findByIdAndUpdate(bookid, updatedBook);

    return res.status(200).json({ message: "book update successfull" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

//delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid, adminid } = req.headers;

    const userData = await User.findById(adminid);

    if (userData?.role !== "admin") {
      return res
        .status(200)
        .json({ message: "You are not having access to perform admin work" });
    }

    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "book deleted successfull" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

//get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: 1 });
    return res.json({
      status: "success ",
      data: books,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

//get recent books
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: 1 }).limit(4);
    return res.json({
      status: "success ",
      data: books,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

//get  book by id
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({
      status: "success ",
      data: book,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
