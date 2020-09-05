import Signin from "../pages/Signin/Signin";
import Home from "../pages/Home/Home";
import Food from "../pages/Food/Food";
import Category from "../pages/Category/Category";
import User from "../pages/User/User";

export const public__routes = [
    {
        path: '/signin',
        component:Signin,
        exact: true,
    },
]

export const private__routes = [
    {
        path: '/home',
        component: Home,
        exact: true,
    },
    {
        path: '/food&drink',
        component: Food,
        exact: true,
    },
    {
        path: '/category',
        component: Category,
        exact: true,
    },
    {
        path: '/users',
        component: User,
        exact: true,
    },
]