import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 220,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
