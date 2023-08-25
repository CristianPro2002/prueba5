const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  business_name: {
    type: String,
  },
  vat_id: {
    type: Number,
    required: true,
  },
  billing_info: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zip_code: {
      type: Number,
    },
    address_one: {
      type: String,
    },
    address_two: {
      type: String,
    },
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
    }
  ]
});

accountSchema.methods.emailIsExist = async function (email) {
  try {
      const userEmail = await mongoose.model("account").findOne({ "billing_info.email": email });
      return userEmail ? true : false;
  } catch (err) {
      return false;
  }
};

module.exports = mongoose.model("account", accountSchema);
