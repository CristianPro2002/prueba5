const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  slider_imgs: {
    type: Array,
  },
  places: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ]
});

module.exports = mongoose.model("Menu", menuSchema);
