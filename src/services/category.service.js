import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://food-app-2020.herokuapp.com/'
})

export const list__categories = async () => {
    try {
        const list = await instance.post('categories');
        return list.data;
    } catch (error) {
        console.log(error)
    }
}