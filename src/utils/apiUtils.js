import axios from 'axios';

const customAxios = axios.create();

async function createRequestConfig() {
    return {
        baseURL: "https://api.themoviedb.org/3",
        timeout: 500000,
        crossdomain: true,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json"
        }
    }
}

const ApiUtils = {
    async get(url) {
        const requestConfig = await createRequestConfig();
        return customAxios.get(url, requestConfig);
    },

    async post(url, body) {
        const requestConfig = await createRequestConfig();
        return customAxios.post(url, body, requestConfig);
    },

    async put(url, body) {
        const requestConfig = await createRequestConfig();
        return customAxios.put(url, body, requestConfig);
    },

    async patch(url, body) {
        const requestConfig = await createRequestConfig();
        return customAxios.patch(url, body, requestConfig);
    },

    async delete(url) {
        const requestConfig = await createRequestConfig();
        return customAxios.delete(url, requestConfig)
    }
};

export default ApiUtils;