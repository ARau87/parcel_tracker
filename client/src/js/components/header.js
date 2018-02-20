import axios from 'axios';


export default {
    name: 'page-header',
    props: [
        'isLoggedIn'
    ],
    template: `
            
            <header>
                    <div class="logo"></div>
        
                    <nav class="nav">
                        <router-link class="nav__link" to="/login">Login</router-link>
                        <router-link class="nav__link" to="/register">Registrierung</router-link>
                        <router-link class="nav__link" v-if="isLoggedIn" to="/dashboard">Übersicht</router-link>
                        <button class="nav__button button-primary" v-if="isLoggedIn" @click.prevent="logout">Logout</button>
                    </nav>          
            </header>
    
    `,
    methods: {
        logout: function(){
            axios.get('/logout');
            this.$emit('logout');
        }
    }
};