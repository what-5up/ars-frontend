import { getRequest,  } from "./utils";

const URL = "aircrafts";

/**
 * Returns all aircraft
 * 
 * @return {Promise<object>} [{ id, origin_code, origin, destination_code, destination }]
 */
export const getAircrafts = () => getRequest(URL);