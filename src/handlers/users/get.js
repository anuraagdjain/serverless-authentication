'use strict';
const response = require('../../utils/response');
module.exports.handler = async (event, context) => {
  let { user } = event.requestContext.authorizer;
  user = JSON.parse(user);
  if (user._id.toString() !== event.pathParameters.id) {
    return response.serverError(401, { message: 'Unauthorized' });
  }
  return response.success({ user });
};
