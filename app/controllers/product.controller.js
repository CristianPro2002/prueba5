const productSchema = require("../models/product.model.js");
const createError = require("http-errors");

const getProducts = async (req, res) => {
  await productSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
};

const getProductsByCategory = async (req, res) => {
  await productSchema
    .find({ category: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
};

const getProduct = async (req, res) => {
  await productSchema
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

const postProduct = async (req, res) => {
  const product = productSchema(req.body);
  await product
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

const deleteProduct = async (req, res) => {
  await productSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

const updateProduct = async (req, res) => {
  const product = await productSchema.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  await product
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
};
