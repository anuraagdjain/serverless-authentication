'use strict';
const databaseConnection = require('../../utils/database.connect');
const response = require('../../utils/response');
const User = require('../../models/user');

module.exports.handler = async (event, context) => {
    try {
        await databaseConnection();
        const payload = JSON.parse(event.body);
        await User.create(payload.user);
        return response.success();
    } catch (error) {
        return response.serverError(500, error);
    }
}