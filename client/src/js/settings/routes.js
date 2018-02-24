import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import Parcel from "../pages/parcel";
import NewParcel from "../pages/new-parcel";
import ParcelCreated from "../pages/parcel-created";
import ParcelTracking from "../pages/parcel-tracking";


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
    {
        path: '/parcel/:trackingNr',
        component: Parcel
    },
    {
        path: '/parcel/:trackingNr/created',
        component: ParcelCreated
    },
    {
        path: '/tracking/:trackingNr',
        component: ParcelTracking
    }
];

export default routes;