import axios from 'axios';

//declaração da função baseAPI, recebe o parâmetro baseURL
const baseAPI = (baseURL) => {
    const api = axios.create({
        baseURL,
    })

    return api;
}

export default baseAPI;