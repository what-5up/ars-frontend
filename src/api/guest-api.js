import { postRequest } from "./utils";

const URL = "guest";

/**
 * Add an guest to the database
 * 
 * @param {object} data - object of the data to be inserted
 * @param {number} data.title - title id
 * @param {string} data.email 
 * @param {string} data.firstName 
 * @param {string} data.lastName 
 * @param {string} data.gender - 'm', 'f', 'o'
 * 
 * @returns {Promise<object>} {guestID}
 */
export const addGuest = (data) => postRequest(URL, data);
