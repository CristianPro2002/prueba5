const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  name: {
    type: Object,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
});

module.exports = mongoose.model("Subcategory", subcategorySchema);