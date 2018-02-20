import routes from './settings/routes';

const router = new VueRouter({
    routes
});


// The main application body
const app = new Vue({
    router,
    el: '#app'
});
