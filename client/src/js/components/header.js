import {logout} from '../common/methods';


export default {
    name: 'page-header',
    props: [
        'loggedin',
        'username',
        'admin'
    ],
    template: `
            
            <header class="pageheader container" v-if="admin">
                    <div class="pageheader__logo col-4">Parcel Tracker</div>
        
                    <nav class="pageheader__nav col-8">
                        <router-link class="nav__link" v-if="loggedin" to="/dashboard">Übersicht</router-link>
                        <button class="nav__button" v-if="loggedin" @click.prevent="logout">Logout</button>
                    </nav>
                    
                    <div class="pageheader__burger">
                        <i>Burger here!</i>
                    </div>
                            
            </header>
            <header class="pageheader container" v-else>
                    <div class="pageheader__logo col-4">Parcel Tracker</div>
        
                    <nav class="pageheader__nav col-8">
                        <router-link class="nav__link" to="/login">Login</router-link>
                        <router-link class="nav__link" to="/register">Registrierung</router-link>
                        <router-link class="nav__link" v-if="loggedin" to="/dashboard">Übersicht</router-link>
                        <button class="nav__button button-primary" v-if="loggedin" @click.prevent="logout">Logout</button>
                    </nav>
                          
                    <div class="pageheader__burger col-8">
                        <i>Burger here!</i>
                    </div>  
            </header>
    
    `,
    methods: {
        logout: function(){
           logout().then(() => this.$emit('logout'));
        }
    }
};