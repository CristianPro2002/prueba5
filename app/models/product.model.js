const mongoose = require("mongoose");
const { appConfig } = require("../../config.js");

const productSchema = new mongoose.Schema({
  name: {
    type: Object,
  },
  description: {
    type: Object,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  alergens: [{
    type: mongoose.Schema.Types.ObjectId,
  }]
});

productSchema.methods.setImgUrl = function setImgUrl(filename){
  const { host, port } = appConfig;
  this.image = `${host}:${port}/public/${filename}`;
}

module.exports = mongoose.model("Product", productSchema);
