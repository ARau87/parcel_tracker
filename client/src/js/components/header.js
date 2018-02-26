import {logout} from '../common/methods';


export default {
    name: 'page-header',
    props: [
        'loggedin',
        'username',
        'admin',
        'application'
    ],
    template: `
          
            <header class="pageheader container" v-if="application">
                    <div class="pageheader__logo col-4">Parcel Tracker</div>
        
                    <nav class="pageheader__nav col-8">
                        <router-link class="nav__link" to="/">Home</router-link>
                        <router-link class="nav__link" to="/login">Login</router-link>
                        <router-link class="nav__link" to="/register">Registrierung</router-link>
                        <router-link class="nav__link" v-if="loggedin" to="/dashboard">Übersicht</router-link>
                        <button class="nav__button button-primary" v-if="admin" @click.prevent="gotoAdminPage">Admin</button>
                        <button class="nav__button button-primary" v-if="loggedin" @click.prevent="logout">Logout</button>
                    </nav>
                          
                    <div class="pageheader__burger col-8">
                        <i @click.preventt="mobileNav" class="ion-navicon-round pageheader__burger__icon"></i>
                    </div>  
            </header>
            <header class="pageheader container" v-else>
                    <div class="pageheader__logo col-4">Parcel Tracker</div>
        
                    <nav class="pageheader__nav col-8">
                        <router-link class="nav__link" v-if="loggedin" to="/dashboard">Übersicht</router-link>
                        <button class="nav__button" v-if="loggedin" @click.prevent="logout">Logout</button>
                    </nav>
                    
                    <div class="pageheader__burger">
                        <i @click.prevent="mobileNav" class="ion-navicon-round pageheader__burger__icon"></i>
                    </div>
                            
            </header>
    
    `,
    methods: {
        logout: function(){
           logout().then(() => this.$emit('logout'));
        },
        gotoAdminPage: function () {
            let adminUrl = window.location.protocol + '//' + window.location.host + '/admin';
            window.location.href = adminUrl;
        },
        mobileNav: function () {
            this.$emit('toggle-navbar');
            console.log(this.application);
            if(this.application){
                this.$router.push('/mobile/nav/app');
            }
            else {
                this.$router.push('/mobile/nav/admin');
            }
        }
    }
};