const accountSchema = require("../models/account.model.js");
const userSchema = require("../models/user.model.js");
const createError = require("http-errors");

const getAccount = async (req, res) => {
  await accountSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
};

const getAccountById = async (req, res) => {
  await accountSchema
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

const postAccount = async (req, res, next) => {
  const bodyUser = {
    first_name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    username: req.body.email,
    password: req.body.password,
    profile: "superadmin",
    account_id: {},
  };
  const body = {
    business_name: req.body.business_name,
    vat_id: req.body.vat_id,
    billing_info: {
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      zip_code: req.body.zip_code,
      address_one: req.body.address_one,
      address_two: req.body.address_two,
    },
    users: [],
  };

  const account = accountSchema(body);

  console.log(req.body.email);
  const emailIsExist = await account.emailIsExist(req.body.email);
  if (emailIsExist) {
    next(createError(400, "Email already exist"));
  } else {
    await account
      .save()
      .then((data) => {
        const user = userSchema(bodyUser);
        user.account_id = data._id;
        user
          .save()
          .then((data) => {
            account.users.push(data._id);
            account
              .save()
              .then((data) => {
                res.json(data);
              })
              .catch((err) => res.json({ message: err }));
          })
          .catch((err) => res.json({ message: err }));
      })
      .catch((err) => res.json({ message: err }));
  }
};

const deleteAccount = async (req, res) => {
  await accountSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

const updateAccount = async (req, res) => {
  const account = await accountSchema.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  await account
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

module.exports = {
  getAccount,
  getAccountById,
  postAccount,
  deleteAccount,
  updateAccount,
};
