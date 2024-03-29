import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = "titles";

/**
 * Returns all the titles of the system
 * 
 * @return {Promise<object>} [{id, title_name}]
 */
export const getTitles = () => getRequest(URL);