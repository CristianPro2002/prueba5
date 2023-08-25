require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY, REFRESH_KEY } = process.env;

const Token = require("./token.model");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  profile: {
    type: String,
  },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || !this.isNew) return next();
  const document = this;
  bcrypt.hash(document.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    document.password = passwordHash;
    next();
  });
});

userSchema.methods.usernameIsExist = async function (username) {
    try {
        const user = await mongoose.model("User").findOne({ username: username });
        return user ? true : false;
    } catch (err) {
        return false;
    }
};

userSchema.methods.isCorrectPassword = async function (password,hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    return false;
  }
};

userSchema.methods.createAccessToken = function () {
  const { _id, username } = this;

  return jwt.sign({ user: { _id, username } }, SECRET_KEY, { expiresIn: "1h" });
};

userSchema.methods.createRefreshToken = async function () {
  const { _id, username } = this;

  const refreshToken = jwt.sign({ user: { _id, username } }, REFRESH_KEY, {
    expiresIn: "7d",
  });

  try {
    await new Token({ token: refreshToken }).save();

    return refreshToken;
  } catch (err) {
    next(new Error("Error in create refresh token"));
  }
};

module.exports = mongoose.model("User", userSchema);
