import axios from 'axios';

const submit = function(){


    if(validateInput(this.email, this.password)){
        axios.post('/login',{
            email: this.email,
            password: this.password
        })
            .then((response) => {
                if(response && response.status === 200){
                    this.$emit('login_successful');
                }
            })
            .catch((err) => {
                console.error(err);
                this.message = 'Benutzername oder Passwort sind inkorrekt!';
                this.messageType = 400;
            })
    }

};

const validateInput = function(email, password) {
    //TODO: Validate if email is really an email by regex
    return true;
}

const Login = {
    template: `
                <div class="page page__login">
                    <h1>Login</h1>
                    
                    <form class="login">
                        <div class="login__message" :style="messageStyle">{{message}}</div>
                        
                        <input class="login__input" v-model="email" placeholder="E-Mail" type="email">
                        <input class="login__input" v-model="password" placeholder="Passwort" type="password">
                        <button class="login__submit button-primary" @click.prevent="submit">Abschicken</button>
                    
                    </form>
                </div>
              `,
    data(){
        return {
            // Error and Information messages about the login form
            message: 'Bitte geben Sie ihr Anmeldedaten hier ein:',
            messageType: 100,

            // Login form models
            password: '',
            email: '',
            submit: submit.bind(this),
            validateInput: validateInput.bind(this)
        }
    },
    computed: {
        messageStyle: function(){
            if(this.messageType === 400){
                return {
                    color: '#ff0000'
                };
            }
            if(this.messageType === 100){
                return {};
            }
        }
    }
}

export default Login;