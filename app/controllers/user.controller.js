require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("../models/user.model.js");
const accountSchema = require("../models/account.model.js");
const tokenSchema = require("../models/token.model.js");
const { sendEmail } = require("../helpers/sendEmail.js");
const { catchedAsync, response } = require("../helpers");
const { validateError } = require("../helpers");
const { ClientError } = require("../helpers/errors");

const { REFRESH_KEY, SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ClientError("Username or password is required");
  } else if (username && password) {
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

        response(res, 200, {
          message: "Login successfully",
          accessToken,
          refreshToken,
        });
      } else {
        validateError(
          {
            name: "ClientError",
          },
          "Password is incorrect"
        );
      }
    } else {
      throw new ClientError("Username is not exist");
    }
  }
};

const loginGoogle = async (req, res) => {
  const { username } = req.body;

  let user = new userSchema({ username });

  const usernameIsExist = await user.usernameIsExist(username);

  user = await userSchema.findOne({ username: username });

  if (usernameIsExist) {
    const accessToken = user.createAccessToken();
    const refreshToken = await user.createRefreshToken();
    response(res, 200, {
      message: "Login successfully",
      accessToken,
      refreshToken,
    });
  } else {
    throw new ClientError("Email is not registered");
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new ClientError("Refresh token is required");

  const deleteRefresh = await tokenSchema.findOneAndDelete({
    token: refreshToken,
  });
  if (!deleteRefresh) {
    throw new ClientError("Refresh token is invalid", 401);
  } else {
    response(res, 200, {
      message: "Logout successfully",
    });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new ClientError("Refresh token is required", 401);

  const tokenDoc = await tokenSchema.findOne({ token: refreshToken });
  if (!tokenDoc) {
    throw new ClientError("Refresh token is invalid", 401);
  } else {
    jwt.verify(tokenDoc.token, REFRESH_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new ClientError("Refresh token is expired", 401);
        } else {
          throw new ClientError("Refresh token is invalid", 401);
        }
      } else {
        const accessToken = jwt.sign({ user: payload.user }, SECRET_KEY, {
          expiresIn: "1h",
        });

        response(res, 200, {
          message: "Refresh token successfully",
          accessToken,
        });
      }
    });
  }
};

const validateToken = async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) throw new ClientError("Access token is required", 401);

  jwt.verify(accessToken, SECRET_KEY, (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        throw new ClientError("Access token is expired", 401);
      } else {
        throw new ClientError("Access token is invalid", 401);
      }
    } else {
      response(res, 200, {
        message: "Access token is valid",
        payload,
      });
    }
  });
};

const validateRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new ClientError("Refresh token is required", 401);

  jwt.verify(refreshToken, REFRESH_KEY, (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        throw new ClientError("Refresh token is expired", 401);
      } else {
        throw new ClientError("Refresh token is invalid", 401);
      }
    } else {
      response(res, 200, {
        message: "Refresh token is valid",
        payload,
      });
    }
  });
};

const sendEmailCode = async (req, res) => {
  if (!req.body.email) throw new ClientError("Email is required");

  const user = new userSchema(req.body);
  const usernameIsExist = await user.usernameIsExist(req.body.email);
  if (!usernameIsExist) {
    throw new ClientError("Email is not registered");
  } else {
    sendEmail(req.body.email, req.body.code)
      .then((result) => {
        response(res, 200, result.message);
      })
      .catch((err) => {
        validateError(err);
      });
  }
};

const resetPassword = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ClientError("Email or password is required");
  }

  const user = new userSchema({ email });
  const usernameIsExist = await user.usernameIsExist(email);

  if (!usernameIsExist) {
    throw new ClientError("Email is not registered");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  await userSchema
    .findOneAndUpdate({ username: email }, { password: hashPassword })
    .then(() => {
      response(res, 200, "Password reset successfully");
    });
};

const getUser = async (req, res) => {
  await userSchema.find().then((data) => response(res, 200, data));
};

const getUserById = async (req, res, next) => {
  await userSchema
    .findById(req.params.id)
    .then((data) => response(res, 200, data));
};

const postUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ClientError("Username or password is required");
  } else if (username && password) {
    const user = new userSchema(req.body);

    const usernameExist = await user.usernameIsExist(username);

    if (usernameExist) {
      throw new ClientError("Username is already exist");
    } else {
      const accessToken = user.createAccessToken();
      const refreshToken = await user.createRefreshToken();

      await user
        .save()
        .then((data) => {
          response(res, 200, {
            message: "Register successfully",
            accessToken,
            refreshToken,
          });
        })
        .catch((err) => validateError(err));
      await accountSchema
        .findById(req.body.account_id)
        .then((data) => {
          data.users.push(user._id);
          data.save();
        })
        .catch((err) =>
          validateError(err, "Error saving user to account collection")
        );
    }
  }
};

// const deleteUser = async (req, res) => {
//   await userSchema
//     .findByIdAndDelete(req.params.id)
//     .then((data) => res.json(data))
//     .catch((err) => res.json({ message: err }));
// };

// const updateUser = async (req, res) => {
//   const user = await userSchema.findByIdAndUpdate(req.params.id, req.body);
//   await user
//     .save()
//     .then((data) => res.json(data))
//     .catch((err) => next(createError(500, "Error updating user")));
// };

module.exports = {
  login: catchedAsync(login),
  loginGoogle: catchedAsync(loginGoogle),
  logout: catchedAsync(logout),
  refreshToken: catchedAsync(refreshToken),
  validateToken: catchedAsync(validateToken),
  validateRefreshToken: catchedAsync(validateRefreshToken),
  sendEmailCode: catchedAsync(sendEmailCode),
  resetPassword: catchedAsync(resetPassword),
  getUser: catchedAsync(getUser),
  getUserById: catchedAsync(getUserById),
  postUser: catchedAsync(postUser),
};
