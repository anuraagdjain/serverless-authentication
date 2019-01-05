module.exports.success = (data) => {
    require('mongoose').disconnect();
    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true,
            ...data
        })
    }
}

module.exports.serverError = (code, data) => {
    require('mongoose').disconnect();
    return {
        statusCode: code,
        body: JSON.stringify({
            success: false,
            ...data
        })
    }
}