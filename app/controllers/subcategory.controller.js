const subcategorySchema = require("../models/subcategory.model.js");
const { catchedAsync, response } = require("../helpers");

// const getSubcategorys = async (req, res) => {
//   await subcategorySchema
//     .find()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => res.json({ message: err }));
// };

const getProductsBySubcategory = async (req, res) => {
  await subcategorySchema
    .aggregate([
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "products",
        },
      },
    ])
    .then((data) => {
      data.find((data) => {
        if (data._id == req.params.id) response(res, 200, data);
      });
    });
};

// const getSubcategory = async (req, res) => {
//   await subcategorySchema
//     .findById(req.params.id)
//     .then((data) => res.json(data))
//     .catch((err) => res.json({ message: err }));
// };

// const postSubcategory = async (req, res) => {
//   const subcategory = subcategorySchema(req.body);
//   await subcategory
//     .save()
//     .then((data) => res.json(data))
//     .catch((err) => res.json({ message: err }));

//   await categorySchema.findById(req.params.id).then((data) => {
//     data.subcategories.push(subcategory._id);
//     data.save();
//   }).catch((err) => res.json({ message: err }));

// };

// const addProduct = async (req, res) => {
//   const subcategory = await subcategorySchema.findById(req.params.id);
//   subcategory.products.push(req.body);
//   await subcategory
//     .save()
//     .then((data) => res.json(data))
//     .catch((err) => res.json({ message: err }));
// };

// const deleteSubcategory = async (req, res) => {
//   await subcategorySchema
//     .findByIdAndDelete(req.params.id)
//     .then((data) => res.json(data))
//     .catch((err) => res.json({ message: err }));
// };

// const updateSubcategory = async (req, res) => {
//   const subcategory = await subcategorySchema.findByIdAndUpdate(
//     req.params.id,
//     req.body
//   );
//   await subcategory
//     .save()
//     .then((data) => res.json(data))
//     .catch((err) => res.json({ message: err }));
// };

module.exports = {
  getProductsBySubcategory: catchedAsync(getProductsBySubcategory),
};
