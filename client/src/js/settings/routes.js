import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";
import NewParcel from "../pages/new-parcel";



const routes = [
    //Index route
    {
        path: '/',
        component: Home
    },

    //Auth routes
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },

    // User routes
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/new-parcel',
        component: NewParcel
    },
];


export default routes;