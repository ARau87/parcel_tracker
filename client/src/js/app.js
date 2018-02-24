import routes from './settings/routes';
import {checkLogin} from "./common/methods";
import Components from './components';

const router = new VueRouter({
    relative: true,
    routes
});


// The main application body
const app = new Vue({
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
                }
                else {
                    this.$router.push('/');
                }
            });
    },
    data(){
      return {
          isLoggedIn: false,
          username: ''
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
                                let isWhitelistPage = false;
                                ['login', 'register', '#'].forEach((href) => {
                                    let currentPage = window.location.href.split('/')[window.location.href.split('/').length-1];
                                    if(window.location.href.split('/')[window.location.href.split('/').length-1] === href){
                                        isWhitelistPage = true;
                                    }
                                });
                                if(!isWhitelistPage){
                                    this.$router.push('/login');
                                }
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
