import axios from 'axios';

import { BASE_API } from '../utils/constants';

const instance = axios.create({
    baseURL: BASE_API
});

export default instance;