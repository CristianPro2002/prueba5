const mongoose = require("mongoose");
const { appConfig } = require("../../config.js");

const categorySchema = new mongoose.Schema({
  name: {
    type: Object,
  },
  image: {
    type: String,
  },
  menus_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

categorySchema.methods.setImgUrl = function setImgUrl(filename) {
  const { host, port } = appConfig;
  this.image = `${host}:${port}/public/${filename}`;
};

module.exports = mongoose.model("Category", categorySchema);
