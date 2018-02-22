import AdminParcel from "../pages/admin/admin-parcel";
import AdminDashboard from "../pages/admin/admin-dashboard";
import AdminHome from "../pages/admin/admin-home";


export const adminRoutes = [
    //Index route
    {
        path: '/',
        component: AdminHome
    },
    {
        path: '/dashboard',
        component: AdminDashboard
    },
    {
        path: '/parcel/:trackingNr',
        component: AdminParcel
    }

];

export default adminRoutes;