/**
 * Utility functions for validating input data.
 */

/**
 * Checks if a value is a non-empty string.
 * @param {any} value
 * @returns {boolean}
 */
function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Checks if a value is a valid email address.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
}

/**
 * Checks if a value is a valid Indian mobile number.
 * @param {string} mobile
 * @returns {boolean}
 */
function isValidIndianMobile(mobile) {
    if (typeof mobile !== 'string') return false;
    const re = /^[6-9]\d{9}$/;
    return re.test(mobile.trim());
}

/**
 * Checks if a value is a valid ObjectId (MongoDB).
 * @param {string} id
 * @returns {boolean}
 */
function isValidObjectId(id) {
    if (typeof id !== 'string') return false;
    return /^[a-f\d]{24}$/i.test(id);
}

/**
 * Checks if a value is a positive integer.
 * @param {any} value
 * @returns {boolean}
 */
function isPositiveInteger(value) {
    return Number.isInteger(value) && value > 0;
}

module.exports = {
    isNonEmptyString,
    isValidEmail,
    isValidIndianMobile,
    isValidObjectId,
    isPositiveInteger,
};