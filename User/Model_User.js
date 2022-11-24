const mongoose = require("mongoose");
const reseña = require("../Reseña")

const User_schema = new mongoose.Schema({
    name:  {type: String, required: true},
    _id: {type: String, required: true, unique:true},
    reseñas: [reseña],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
     
  module.exports = mongoose.model("User", User_schema);