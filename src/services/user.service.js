import axios from 'axios';
var jwt = require('jsonwebtoken');
export const SECRET_KEY = 'WINTER_IS_COMING';

const instance = axios.create({
    baseURL: 'https://food-app-2020.herokuapp.com/'
})

export const sign_up = async (email) => {
    try {
        const sign_up = await instance.post('signup', { email });
        return sign_up;
    } catch (error) {
        console.log(error)
    }
}

export const sign_in = async (email, password) => {
    try {
        const sign_up = await instance.post('signin', { email, password });
        return sign_up;
    } catch (error) {
        return error;
    }
}

export const list__users = async (email, password) => {
    try {
        const users = await instance.post('users', {});
        return users;
    } catch (error) {
        return error;
    }
}

export const update__user = async (id, data) => {
    try {
        const users = await instance.post('user-update', { id, ...data });
        return users;
    } catch (error) {
        return error;
    }
}

export const generateToken = (id) => {
    return jwt.sign({ id, time : Date.now() }, SECRET_KEY);
}