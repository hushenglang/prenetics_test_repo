/**
 * rest api response result builder tool
 * @author JoeHu
 * @date 2017-Sep-16
 */

'use strict';

exports.createSuccessResult = function (data) {
    return {
        success: true,
        data: data
    }
};

exports.createFailResult = function (errorMessage) {
    return {
        success: false,
        message: errorMessage
    }
};

exports.createErrorResult = function (errorMessage) {
    return {
        success: false,
        errorMessage: errorMessage
    }
};