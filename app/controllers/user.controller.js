require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const userSchema = require("../models/user.model.js");
const accountSchema = require("../models/account.model.js");
const tokenSchema = require("../models/token.model.js");
const { jsonResponse } = require("../helpers/jsonresponse.js");
const { sendEmail } = require("../helpers/sendEmail.js");

const { REFRESH_KEY, SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(createError(400, "Username or password is required"));
  } else if (username && password) {
    try {
      let user = new userSchema({ username, password });

      const usernameExist = await user.usernameIsExist(username);

      if (usernameExist) {
        user = await userSchema.findOne({ username: username });

        const correctPassword = await user.isCorrectPassword(
          password,
          user.password
        );

        if (correctPassword) {
          const accessToken = user.createAccessToken();
          const refreshToken = await user.createRefreshToken();

          res.json(
            jsonResponse(200, {
              message: "Login successfully",
              accessToken,
              refreshToken,
            })
          );
        } else {
          next(createError(400, "Password is incorrect"));
        }
      } else {
        next(createError(400, "Username is not exist"));
      }
    } catch (error) {
      next(createError(500, "Error Login"));
    }
  }
};

const loginGoogle = async (req, res, next) => {
  const { username } = req.body;

  let user = new userSchema({ username });

  const usernameIsExist = await user.usernameIsExist(username);

  user = await userSchema.findOne({ username: username });

  if (usernameIsExist) {
    const accessToken = user.createAccessToken();
    const refreshToken = await user.createRefreshToken();
    res.json(
      jsonResponse(200, {
        message: "Login successfully",
        accessToken,
        refreshToken,
      })
    );
  } else {
    next(createError(400, "Email is not registered"));
  }
};

const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) next(createError(400, "Refresh token is required"));

  try {
    await tokenSchema.findOneAndRemove({ token: refreshToken });

    res.json(jsonResponse(200, "Logout successfully"));
  } catch (err) {
    next(createError(500, "No token found"));
  }
};

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) next(createError(400, "Refresh token is required"));
  try {
    const tokenDoc = await tokenSchema.findOne({ token: refreshToken });
    if (!tokenDoc) {
      next(createError(401, "Refresh token is not exist"));
    } else {
      const payload = jwt.verify(tokenDoc.token, REFRESH_KEY);
      const accessToken = jwt.sign({ user: payload.user }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.json(
        jsonResponse(200, {
          message: "Refresh token successfully",
          accessToken,
        })
      );
    }
  } catch (err) {
    next(createError(500, "No token found"));
  }
};

const validateToken = async (req, res, next) => {
  const { accessToken } = req.body;

  if (!accessToken) next(createError(400, "Access token is required"));

  try {
    const payload = jwt.verify(accessToken, SECRET_KEY);
    if (!payload) next(createError(401, "Token is invalid"));
    res.json(
      jsonResponse(200, {
        message: "Access token is valid",
        payload,
      })
    );
  } catch (err) {
    next(createError(500, "Access token is invalid"));
  }
};

const validateRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) next(createError(400, "Refresh token is required"));

  try {
    const payload = jwt.verify(refreshToken, REFRESH_KEY);
    if (!payload) next(createError(401, "Token is invalid"));
    res.json(
      jsonResponse(200, {
        message: "Refresh token is valid",
        payload,
      })
    );
  } catch (err) {
    next(createError(500, "Refresh token is invalid"));
  }
};

const sendEmailCode = async (req, res, next) => {
  if (!req.body.email) next(createError(400, "Email is required"));

  const user = new userSchema(req.body);
  const usernameIsExist = await user.usernameIsExist(req.body.email);
  if (!usernameIsExist) {
    next(createError(400, "Email is not registered"));
  } else {
    sendEmail(req.body.email, req.body.code)
      .then((result) => {
        res.json(jsonResponse(200, result.message));
      })
      .catch((err) => {
        next(createError(500, err.message));
      });
  }
};

const resetPassword = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(createError(400, "Email or password is required"));
  }

  const user = new userSchema({ email });
  const usernameIsExist = await user.usernameIsExist(email);

  if (!usernameIsExist) {
    next(createError(400, "Email is not registered"));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  await userSchema
    .findOneAndUpdate({ username: email }, { password: hashPassword })
    .then((data) => {
      res.json(jsonResponse(200, "Reset password successfully"));
    })
    .catch((err) => {
      next(createError(500, "Error reset password"));
    });
};

const getUser = async (req, res) => {
  await userSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(createError(500, "Error getting users")));
};

const getUserById = async (req, res, next) => {
  await userSchema
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(createError(500, "Error getting user")));
};

const postUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(createError(400, "Username or password is required"));
  } else if (username && password) {
    const user = new userSchema(req.body);

    const usernameExist = await user.usernameIsExist(username);

    if (usernameExist) {
      next(createError(400, "Username is already exist"));
    } else {
      const accessToken = user.createAccessToken();
      const refreshToken = await user.createRefreshToken();

      await user
        .save()
        .then((data) => {
          res.json(
            jsonResponse(200, {
              message: "User created successfully",
              accessToken,
              refreshToken,
            })
          );
        })
        .catch((err) => res.json(jsonResponse(500, "Error Saving User")));
      await accountSchema
        .findById(req.body.account_id)
        .then((data) => {
          data.users.push(user._id);
          data.save();
        })
        .catch((err) =>
          res.json(jsonResponse(500, "Error Saving User to Account"))
        );
    }
  }
};

const deleteUser = async (req, res) => {
  await userSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
};

const updateUser = async (req, res) => {
  const user = await userSchema.findByIdAndUpdate(req.params.id, req.body);
  await user
    .save()
    .then((data) => res.json(data))
    .catch((err) => next(createError(500, "Error updating user")));
};

module.exports = {
  login,
  loginGoogle,
  logout,
  refreshToken,
  validateToken,
  validateRefreshToken,
  sendEmailCode,
  resetPassword,
  getUser,
  getUserById,
  postUser,
  deleteUser,
  updateUser,
};
