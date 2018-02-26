import {checkLogin, logout} from "../common/methods";

const MobileNav = {

    template: `
                <div v-if="app" class="page page__menu">
                        <button class="menu__button button-exit" @click.prevent="exit">X</button>
                        <router-link class="menu__link" @click.native="leave" to="/">Home</router-link>
                        <router-link class="menu__link" @click.native="leave" to="/login">Login</router-link>
                        <router-link class="menu__link" @click.native="leave" to="/register">Registrierung</router-link>
                        <router-link class="menu__link" @click.native="leave" v-if="isLoggedIn" to="/dashboard">Übersicht</router-link>
                        <button class="menu__button" v-if="admin && isLoggedIn" @click.prevent="gotoAdminPage">Admin</button>
                        <button class="menu__button" v-if="isLoggedIn" @click.prevent="logout">Logout</button>
                </div>
                <div v-else class="page page__menu">
                        <button class="menu__button button-exit" @click.prevent="exit">X</button>
                        <router-link class="menu__link" @click.native="leave" to="/">Home</router-link>
                        <router-link class="menu__link" @click.native="leave" v-if="isLoggedIn" to="/dashboard">Übersicht</router-link>
                        <button class="menu__button" v-if="admin && isLoggedIn" @click.prevent="gotoAppPage">App</button>
                        <button class="menu__button" v-if="isLoggedIn" @click.prevent="logout">Logout</button>
                </div>
              `,
    methods: {
        logout: function(){
            this.$emit('toggle-navbar');
            logout().then(() => this.$emit('logout'));
            this.$router.push('/');
        },
        gotoAdminPage: function () {
            this.$emit('toggle-navbar');
            let appUrl = window.location.protocol + '//' + window.location.host + '/admin';
            window.location.href = appUrl;
        },
        gotoAppPage: function () {
            this.$emit('toggle-navbar');
            let adminUrl = window.location.protocol + '//' + window.location.host;
            window.location.href = adminUrl;
        },
        checkLogin,
        exit: function(){
            this.$emit('toggle-navbar');
            this.$router.push('/dashboard');
        },
        leave: function () {
            this.$emit('toggle-navbar');
        }
    },
    mounted(){

        if(this.$route.params.app === 'admin'){
            this.app = false;
        }

        this.checkLogin()
            .then(data => {
                if(data && data.username){
                    this.isLoggedIn = true;
                    this.username = data.username;
                    this.admin = data.admin;
                }
            });
    },
    data(){
        return {

            // Currently logged in?
            isLoggedIn: false,
            username: '',
            admin: false,
            app: true

        }
    }

}

export default MobileNav;