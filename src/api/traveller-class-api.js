import { getRequest, postRequest, putRequest, deleteRequest } from "./utils";

const URL = "traveler-classes";

/**
 * Returns all the traveller classes of the system
 * 
 * @return {Promise<object>} [{id, class}]
 */
export const getTravelerClasses = () => getRequest(URL);