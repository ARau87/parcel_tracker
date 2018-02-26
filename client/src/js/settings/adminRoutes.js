import AdminParcel from "../pages/admin/admin-parcel";
import AdminDashboard from "../pages/admin/admin-dashboard";
import AdminHome from "../pages/admin/admin-home";
import Login from "../pages/login";
import MobileNav from "../pages/navigation";


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
    },
    {
        path: '/mobile/nav/:app',
        component: MobileNav
    }

];

export default adminRoutes;