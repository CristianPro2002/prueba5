const categorySchema = require("../models/category.model.js");
const menuSchema = require("../models/menu.model.js");
const createError = require("http-errors");

const getCategorys = async (req, res) => {
  await categorySchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
};

const getCategorysByMenu = async (req, res) => {
  await categorySchema
    .find({ menus_id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
};

const getProductsByCategory = async (req, res) => {
  
  await categorySchema.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "products",
        foreignField: "_id",
        as: "products"
      }
    },
    {
      $lookup: {
        from: "subcategories",
        localField: "subcategories",
        foreignField: "_id",
        as: "subcategories"
      }
    }
  ]).then((data) => {
    data.find((category) => {
      if (category._id == req.params.id) {
        res.json(category);
      }
    });
  }).catch((err) => res.json({ message: err }));
};

const getCategory = async (req, res) => {
  await categorySchema
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

const postCategory = async (req, res) => {
  const category = categorySchema(req.body);
  await category
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
  await menuSchema.findById(req.body.menu_id).then((data) => {
    data.categories.push(category._id);
    data.save();
  }).catch((err) => res.json({ message: err })) ;
};

const deleteCategory = async (req, res) => {
  await categorySchema
    .findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

const updateCategory = async (req, res) => {
  const category = await categorySchema.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  await category
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

module.exports = {
  getCategorys,
  getCategorysByMenu,
  getProductsByCategory,
  getCategory,
  postCategory,
  deleteCategory,
  updateCategory,
};
