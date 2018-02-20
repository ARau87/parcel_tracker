import axios from 'axios';
import {checkLogin} from "../common/methods";
import Components from '../components';

const Login = {
    components: Components,
    template: `
                <div class="page page__login">
                
                    <page-header @logout="$router.push('/')" :username="username" :isLoggedIn="isLoggedIn"></page-header>
                    
                    <h1>Login</h1>
                    
                    <form class="login">
                        <div class="login__message" :style="messageStyle">{{message}}</div>
                        
                        <input class="login__input" v-model="email" placeholder="E-Mail" type="email">
                        <input class="login__input" v-model="password" placeholder="Passwort" type="password">
                        <button class="login__submit button-primary" @click.prevent="submit">Abschicken</button>
                    
                    </form>
                </div>
              `,
    mounted(){
        this.checkLogin()
            .then(data => {
                if(data && data.username){
                    this.isLoggedIn = true;
                    this.username = data.username;
                }
            });
    },
    data(){
        return {
            // Error and Information messages about the login form
            message: 'Bitte geben Sie ihr Anmeldedaten hier ein:',
            messageType: 100,

            // Login form models
            password: '',
            email: '',

            // Currently logged in?
            isLoggedIn: false,
            username: ''

        }
    },
    methods: {
        submit: function(){


            if(this.validateInput(this.email, this.password)){
                axios.post('/login',{
                    email: this.email,
                    password: this.password
                })
                    .then((response) => {
                        if(response && response.status === 200){
                            this.message = 'Sie haben sich erfolgreich angemeldet';
                            this.messageType = 200;
                            this.$emit('login_successful');
                            setTimeout(() => {
                                this.$router.push({path: '/dashboard'});
                            }, 1000);
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        this.message = 'Benutzername oder Passwort sind inkorrekt!';
                        this.messageType = 400;
                    })
            }

        },
        validateInput: function(email, password) {
            //TODO: Validate if email is really an email by regex
            return true;
        },
        checkLogin: checkLogin
    },
    computed: {
        messageStyle: function(){
            if(this.messageType === 400){
                return {
                    color: '#f00'
                };
            }
            if(this.messageType === 200){
                return {
                    color: '#0a0'
                };
            }
            if(this.messageType === 100){
                return {};
            }
        }
    }
}

export default Login;