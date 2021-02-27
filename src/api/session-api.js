import { postRequest } from "./utils";

const URL = "session";

/**
 * Add passangers
 * 
 * @param {object[]} data - login info
 * @param {string} data.email
 * @param {string} data.password 
 * 
 * @return {Promise<object>} { token }
 */
export const login = (data) => postRequest(URL, data);