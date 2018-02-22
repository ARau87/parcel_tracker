import adminRoutes from './settings/adminRoutes';

const router = new VueRouter({
    relative: true,
    routes: adminRoutes
});


// The main application body
const adminApp = new Vue({
    router,
    el: '#app'
});
