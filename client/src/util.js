import axios from 'axios';

export const request = axios.create({
    baseURL: 'http://localhost:3001'
});

export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);

export const setAuthHeader = (token) => request.defaults.headers.common["authorization"] = 'Bearer ' + token;  // set default header which will be sent with every request
export const unsetAuthHeader = () => delete request.defaults.headers.common["authorization"];

export const getUser = () => request.get("/user");