const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    url: {
      type: String
      required:true
    },
    title: {
        type: String
        required:true
      },
      author: {
        type: String,
        required:true,
      },
      price:{
        type:Number,
        requred:true
      },
      desc:{
        type:String,
        requred:true
      },
      language:{
        type:String,
        requred:true
      }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
