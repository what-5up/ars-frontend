import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = "passengers";

/**
 * Add passangers
 * 
 * @param {object[]} data - array of the passenger information objects
 * @param {number} data.title - title id
 * @param {string} data.first_name
 * @param {string} data.last_name
 * @param {string} data.birthday - yyyy-MM-dd
 * @param {string} data.gender - m, f, o
 * @param {string} data.country
 * @param {string} data.passport_no
 * @param {string} data.passport_expiry - yyyy-MM-dd
 * 
 * @return {Promise<object>}
 */
export const addPassengers = (data) => postRequest(URL, data);