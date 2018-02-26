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
            isAdmin: false,
            navHidden: false
        }
    },
    methods: {
        logout: function(){
            this.isLoggedIn = false;
            this.username = '';
            this.isAdmin = false;
            this.$router.push('/');
        },
        checkLogin: function () {
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
        toggleNav: function(){
            this.navHidden = !this.navHidden;
        }
    }
});
