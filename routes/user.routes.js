const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;
const auth = require("../middlewares/auth");
const {
  authenticateUser,
  setToken,
  findUserByEmail,
  registerUser,
} = require("../controllers/user.controller");

const userJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/)
    .min(4)
    .required(),
});

router.post("/register", async (req, res, next) => {
  try {
    const { error, value } = userJoiSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "Conflict",
        code: 400,
        message: "Validation error",
        details: error.details,
      });
      return;
    }
    const { email, password } = value;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({
        status: "Conflict",
        code: 400,
        message: "email in use",
      });
    } else {
      const user = await registerUser(email, password);
      res.status(201).json({
        status: "Success",
        code: 201,
        data: user,
      });
    }
  } catch (err) {
    next(err);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { error, value } = userJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Validation error",
        details: error.details,
      });
    }
    const { email, password } = value;
    const user = await findUserByEmail(email);
    const userAuth = await authenticateUser(email, password);
    if (userAuth) {
      const payload = {
        id: user.id,
        username: user.username,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });
      await setToken(user.email, token);
      return res.json({
        status: "success",
        code: 200,
        data: {
          ID: user._id,
          email: user.email,

          token: token,
        },
      });
    } else {
      return res.json({
        status: "failure",
        code: 400,
        message: error,
      });
    }
  } catch (error) {
    next(error);
  }
});
router.get("/current", auth, async (req, res, next) => {
  try {
    const user = req.user;
    res.json({
      status: "Success",
      code: 200,
      data: user,
    });
  } catch (err) {
    next(err);
  }
});
router.get("/logout", auth, async (req, res, next) => {
  const { email } = req.user;
  await setToken(email, null);
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Successfully logged out user: ${email}`,
    },
  });
});
module.exports = router;
