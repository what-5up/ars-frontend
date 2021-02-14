import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = "guest";

/**
 * Add an user to the database
 * 
 * @param {object} data - object of the data to be inserted
 * @param {number} data.title - title id
 * @param {string} data.email 
 * @param {string} data.firstName 
 * @param {string} data.lastName 
 * @param {string} data.gender - 'm', 'f', 'o'
 * 
 * @returns {Promise<object>} {userID}
 */
export const addGuest = (data) => postRequest(`${URL}`, data);
