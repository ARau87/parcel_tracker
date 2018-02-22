import routes from './settings/routes';

const router = new VueRouter({
    relative: true,
    routes
});


// The main application body
const app = new Vue({
    router,
    el: '#app'
});
