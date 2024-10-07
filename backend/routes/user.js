const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//signup
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    //check username length is more than 4 .
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "username length should be greather then 3 " });
    }

    //check username already exits
    const exitsUser = await User.findOne({ username: username });
    if (exitsUser) {
      return res.status(400).json({ message: "username already exits " });
    }

    //check email already exits
    const exitsEmail = await User.findOne({ email: email });
    if (exitsEmail) {
      return res.status(400).json({ message: "email already exits " });
    }

    //check passwsord gether then  6

    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "password's length should be greather then 5 " });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      address,
    });

    await newUser.save();
    return res.status(200).json({ message: "signUp successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
});

//signIn user

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    //check username already exits
    const exitsUser = await User.findOne({ username: username });
    if (!exitsUser) {
      return res.status(400).json({ message: "Invalid credentials " });
    }

    await bcrypt.compare(password, exitsUser?.password, (err, data) => {
      if (!err && data) {
        const authClaims = [
          { name: exitsUser?.username },
          { role: exitsUser?.role },
        ];
        const token = jwt.sign({ authClaims }, "bookstore123", {
          expiresIn: "30d",
        });
        res
          .status(200)
          .json({ id: exitsUser?._id, role: exitsUser?.role, token: token });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;

    console.log(address);

    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address updated successfull" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
