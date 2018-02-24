import adminRoutes from './settings/adminRoutes';
import {checkLogin} from "./common/methods";
import Components from "./components";

const router = new VueRouter({
    relative: true,
    routes: adminRoutes
});


// The main application body
const adminApp =  new Vue({
    components: Components ,
    router,
    el: '#app',
    mounted(){
        this.loginInterval();

        checkLogin()
            .then(data => {
                if(data && data.username){
                    this.isLoggedIn = true;
                    this.username = data.username;
                    this.isAdmin = data.admin;
                }
                else {
                    this.$router.push('/');
                }
            });
    },
    data(){
        return {
            isLoggedIn: false,
            username: '',
            isAdmin: false
        }
    },
    methods: {
        loginInterval: function () {
            setInterval(() => {
                checkLogin()
                    .then(data => {
                        if(data && data.username){
                            this.isLoggedIn = true;
                            this.username = data.username;
                        }
                        else {
                            this.$router.push('/');
                        }
                    });}, 10000);
        },
        logout: function(){
            this.isLoggedIn = false;
            this.username = '';
            this.$router.push('/');
        }
    }
});
