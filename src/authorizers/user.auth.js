'use strict';
const databaseConnection = require('../utils/database.connect');
const User = require('../models/user');
const jwtUtil = require('../utils/jwt.util');

const generatePolicy = function (principalId, effect, resource, user) {
  const authResponse = {};
  authResponse.principalId = principalId;

  /**
     * Note:
     * Converting user data to string is mandatory as
     * AWS Lambda is unable to transfer nested json object / larger payload,
     * but works fine when testing with serverless-offline
     *  */

  authResponse.context = { user: JSON.stringify(user) };

  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

module.exports.handler = (event, context) => {
  if (!event.headers.hasOwnProperty('Authorization')) {
    return context.fail('Unauthorized');
  }

  const jwtPayload = jwtUtil.verifyJWT(event.headers.Authorization);
  if (!jwtPayload) {
    return context.fail('Unauthorized');
  }
  databaseConnection().then(
    User.findOne({ email: jwtPayload.email }).then(user => {
      return context.succeed(generatePolicy(user.email, 'Allow', event.methodArn, user));
    })
  ).catch(e => {
    console.log('DB_CONN_FAILED');
    console.log(e.message);
    return context.fail('Unauthorized');
  });
};
