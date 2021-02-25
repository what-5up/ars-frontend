import { getRequest,  } from "./utils";

const URL = "aircraft-models";

/**
 * Returns all aircraft-models
 * 
 * @return {Promise<object>} [{ id, origin_code, origin, destination_code, destination }]
 */
export const getModels = () => getRequest(URL);