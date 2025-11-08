import express from "express";
import Contact from "../model/contactModel.js";

const router = express.Router();

router.post("/fetch-review", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ msg: "Please Fill your Credentials" });
    }

    const user = await Contact.findOne({ email });
    if (user) {
      return res.status(500).json({ msg: "You have already Posted Review" });
    }

    const newUser = new Contact({
      name,
      email,
      message,
    });
    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      message: newUser.message,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});


router.get("/fetch-review", async (req, res) => {
  try {
    const reviews = await Contact.find({});
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ msg: "No reviews found" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

export default router;
