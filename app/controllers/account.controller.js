const accountSchema = require("../models/account.model.js");
const userSchema = require("../models/user.model.js");
const { catchedAsync, response } = require("../helpers");
const { validateError } = require("../helpers");
const { ClientError } = require("../helpers/errors");

const getAccounts = async (req, res) => {
  await accountSchema.find().then((data) => response(res, 200, data));
};

const getAccountById = async (req, res) => {
  await accountSchema.findById(req.params.id).then((data) => {
    if (!data) throw new ClientError("Account not found");
    response(res, 200, data);
  });
};

const postAccount = async (req, res) => {
  const emailModified = req.body.email.toLowerCase();
  const bodyUser = {
    first_name: req.body.name,
    email: emailModified,
    phone: req.body.phone,
    username: emailModified,
    password: req.body.password,
    profile: "superadmin",
    account_id: {},
  };
  const body = {
    business_name: req.body.business_name,
    vat_id: req.body.vat_id,
    billing_info: {
      name: req.body.name,
      email: emailModified,
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

  const emailIsExist = await account.emailIsExist(req.body.email);
  if (emailIsExist) {
    throw new ClientError("Email already exist");
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
              .then((data) => response(res, 200, data))
              .catch((err) => validateError(err, "Error saving account"));
          })
          .catch((err) => validateError(err, "Error saving user"));
      })
      .catch((err) => validateError(err));
  }
};

const deleteAccount = async (req, res) => {
  await accountSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => response(res, 200, data));
};

const updateAccount = async (req, res) => {
  const account = await accountSchema.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  await account.save().then((data) => response(res, 200, data));
};

module.exports = {
  getAccounts: catchedAsync(getAccounts),
  getAccountById: catchedAsync(getAccountById),
  postAccount: catchedAsync(postAccount),
  deleteAccount: catchedAsync(deleteAccount),
  updateAccount: catchedAsync(updateAccount),
};
