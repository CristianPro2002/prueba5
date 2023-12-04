const productSchema = require("../models/product.model.js");
const { catchedAsync, response } = require("../helpers");

// const getProducts = async (req, res) => {
//   await productSchema
//     .find()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => res.json({ message: err }));
// };

const getProductsByCategory = async (req, res) => {
  await productSchema
    .find({ category: req.params.id })
    .then((data) => response(res, 200, data));
};

const getProductsByPlaces = async (req, res) => {
  const ids = req.body.places;

  await productSchema
    .find({ place_id: { $in: ids } })
    .then((data) => response(res, 200, data));
};

const getProduct = async (req, res) => {
  await productSchema
    .findById(req.params.id)
    .then((data) => response(res, 200, data));
};

const postProduct = async (req, res) => {
  const product = productSchema(req.body);
  await product.save().then((data) => response(res, 200, data));
};

const putProduct = async (req, res) => {
  await productSchema
    .findByIdAndUpdate(req.params.id, req.body)
    .then((data) => response(res, 200, data));
};

const deleteProduct = async (req, res) => {
  await productSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => response(res, 200, data));
};

// const getProduct = async (req, res) => {
//   await productSchema
//     .findById(req.params.id)
//     .then((data) => res.json(data))
//     .catch((err) => res.json({ message: err }));
// };

// const postProduct = async (req, res) => {
//   const product = productSchema(req.body);
//   await product
//     .save()
//     .then((data) => res.json(data))
//     .catch((err) => res.json({ message: err }));
// };

// const deleteProduct = async (req, res) => {
//   await productSchema
//     .findByIdAndDelete(req.params.id)
//     .then((data) => res.json(data))
//     .catch((err) => res.json({ message: err }));
// };

// const updateProduct = async (req, res) => {
//   const product = await productSchema.findByIdAndUpdate(
//     req.params.id,
//     req.body
//   );
//   await product
//     .save()
//     .then((data) => res.json(data))
//     .catch((err) => res.json({ message: err }));
// };

module.exports = {
  getProductsByCategory: catchedAsync(getProductsByCategory),
  getProductsByPlaces: catchedAsync(getProductsByPlaces),
  getProduct: catchedAsync(getProduct),
  postProduct: catchedAsync(postProduct),
  putProduct: catchedAsync(putProduct),
  deleteProduct: catchedAsync(deleteProduct),
};
