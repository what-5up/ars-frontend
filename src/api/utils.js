import axios from './axios';

export const getRequest = async (url, body) => {
	try {
		let response = (body) ? await axios.get(url,body) : await axios.get(url);
		return generateSuccessOutput(response);
	} catch (error) {
		return generateErrorOutput(error);
	}
};

export const postRequest = async (url, data) => {
	try {
		let response = await axios.post(url, data);
		return generateSuccessOutput(response);
	} catch (error) {
		return generateErrorOutput(error);
	} 
};

export const putRequest = async (url, data) => {
	try {
		let response = await axios.put(url, data);
		return generateSuccessOutput(response);
	} catch (error) {
		return generateErrorOutput(error);
	}
};

export const deleteRequest = async (url) => {
	try {
		let response = await axios.delete(url);
		return generateSuccessOutput(response);
	} catch (error) {
		return generateErrorOutput(error);
	}
};

export const generateOptionalParametersQuery = (params) => {
    let optionalParams = [];
    Object.keys(params).forEach(key => {
        if (params[key] !== null) optionalParams.push(`${key}=${params[key]}`)
    })
    return (optionalParams.length > 0) ? `?${optionalParams.join('&')}` : ''
}

const generateSuccessOutput = (response) => {
	return  {
		data: response.data.results,
		message: response.data.message,
	}
}

const generateErrorOutput = (error) => {
	return {  
		error: error,
		message : error.response.data.message
	}
}