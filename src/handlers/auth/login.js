'use strict';
const databaseConnection = require('../../utils/database.connect');
const response = require('../../utils/response');
const User = require('../../models/user');

module.exports.handler = async (event, context) => {
  try {
    await databaseConnection();
    const payload = JSON.parse(event.body);
    const user = await User.findOne({ email: payload.user.email });
    if (!user.verifyPassword(payload.user.password)) {
      throw new Error('Invalid Credentials');
    }
    const token = user.generateJWT();
    return response.success({ token, user });
  } catch (error) {
    return response.serverError(500, error);
  }
};
