import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = "employees";

/**
 * Return the employee for the given user id
 * 
 * @param {numeber} id - emp id
 * 
 * @returns {Promise<object>}
 */
export const getEmployee = (id) => getRequest(`${URL}/${id}`);
