const User = require("../schemas/user.schema");
const authenticateUser = async (email, password) => {
  return User.findOne({ email, password });
};
const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const registerUser = async (email, password) => {
  return User.create({ email, password });
};

const setToken = async (email, token) => {
  return User.updateOne({ email }, { token });
};

module.exports = {
  authenticateUser,
  setToken,
  findUserByEmail,
  registerUser,
};
