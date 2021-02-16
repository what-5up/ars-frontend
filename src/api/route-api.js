import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = "routes";

/**
 * Returns all routes of the system
 * 
 * @return {Promise<object>} [{ id, origin_code, origin, destination_code, destination }]
 */
export const getRoutes = () => getRequest(URL);

/**
 * Returns route for the given flight no 
 * 
 * @param {number} id flight no
 * 
 * @return {Promise<object>} { id, origin_code, origin, origin_rregion, destination_code, destination, destination_region }
 */
export const getRoute = (id) => getRequest(`${URL}/${id}`);