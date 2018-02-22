import axios from 'axios';
import {logout} from '../common/methods';


export default {
    name: 'page-header',
    props: [
        'isLoggedIn',
        'username',
        'admin'
    ],
    template: `
            
            <header v-if="admin">
                    <div class="logo"></div>
        
                    <nav class="nav">
                        <router-link class="nav__link" v-if="isLoggedIn" to="/dashboard">Übersicht</router-link>
                        <button class="nav__button button-primary" v-if="isLoggedIn" @click.prevent="logout">Logout</button>
                    </nav>
                    
                    <div v-if="isLoggedIn">Angemeldet als {{username}}</div>          
            </header>
            <header v-else>
                    <div class="logo"></div>
        
                    <nav class="nav">
                        <router-link class="nav__link" to="/login">Login</router-link>
                        <router-link class="nav__link" to="/register">Registrierung</router-link>
                        <router-link class="nav__link" v-if="isLoggedIn" to="/dashboard">Übersicht</router-link>
                        <button class="nav__button button-primary" v-if="isLoggedIn" @click.prevent="logout">Logout</button>
                    </nav>
                    
                    <div v-if="isLoggedIn">Angemeldet als {{username}}</div>          
            </header>
    
    `,
    methods: {
        logout: function(){
           logout().then(() => this.$emit('logout'));
        }
    }
};