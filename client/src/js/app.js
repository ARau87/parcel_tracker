import routes from './settings/routes';

const router = new VueRouter({
    routes
});

const app = new Vue({
    router,
    el: '#app'
});