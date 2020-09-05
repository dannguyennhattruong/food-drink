import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://food-app-2020.herokuapp.com/'
})

export const list__foods = async () => {
    try {
        const list = await instance.post('foods');
        return list;
    } catch (error) {
        return error;
    }
}

export const delete__food = async (id) => {
    try {
        const food__deleted = instance.post('delete-food', { id });
        return food__deleted;
    } catch (error) {
        return error;
    }
}