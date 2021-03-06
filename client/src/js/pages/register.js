import axios from 'axios';
import {checkLogin} from "../common/methods";
import Components from '../components';


const Register = {
    components: Components,
    template: `
                <div class="page page__register">
                              
                    <main>
                    
                        <h1>Registrierung</h1>
                        
                        <form class="register">
                            
                            <div class="register__message" :style="messageStyle">{{message}}</div>
                        
                            <input class="register__input" placeholder="E-Mail" v-model="email" type="email">
                            <input class="register__input" placeholder="Passwort" v-model="password" type="password">
                            <input class="register__input" placeholder="Passwort (Wiederholung)" v-model="passwordRepeat" type="password">
                            <input class="register__input" placeholder="Vorname" v-model="firstname" type="text">
                            <input class="register__input" placeholder="Nachname" v-model="lastname" type="text">
                            <input class="register__input" placeholder="Stadt" v-model="city" type="text">
                            <input class="register__input" placeholder="PLZ" v-model="postcode" type="number">
                            <input class="register__input" placeholder="Adresse" v-model="address" type="text">
                            
                            <button class="register__submit button-primary" @click.prevent="submit">Abschicken</button>
    
                        </form>
                    
                    </main>
                    
                    
                </div>
              `,
                mounted(){
                },
              data() {
                return {
                    //Message related models
                    message: 'Bitte geben Sie die folgenden Informationen zu Ihrer Person ein:',
                    messageType: 100,

                    //Registration related models:
                    email: '',
                    password: '',
                    passwordRepeat: '',
                    firstname: '',
                    lastname: '',
                    city: '',
                    postcode: '',
                    address: '',

                }
              },
            methods: {
                submit: function () {
                    if(this.validateInput()){
                        axios.post('/register', {
                            email: this.email,
                            password: this.password,
                            firstname: this.firstname,
                            lastname: this.lastname,
                            city: this.city,
                            address: this.address,
                            postcode: this.postcode
                        })
                            .then((res) => {
                                if(res.status === 200){
                                    this.messageType = 200;
                                    this.message = 'Sie wurden erfolgreich angemeldet. Viel Spaß mit dem Parcel-Tracker!'
                                    this.$router.push('/login');
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                this.message = 'Bitte überprüfen Sie Ihre Eingaben und wiederholen Sie die Registrierung!';
                                this.messageType = 400;
                            })
                    }
                },
                validateInput: function () {

                    //TODO: Validate the input before the information is sent to the server!
                    if(this.password == this.passwordRepeat){
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                checkLogin: checkLogin
            },
            computed: {
                messageStyle: function () {
                    if(this.messageType === 100){
                        return {};
                    }
                    if(this.messageType === 200){
                        return {
                            color: '#0a0'
                        };
                    }
                    if(this.messageType === 400){
                        return {
                            color: '#f00'
                        };
                    }
                }
            }
}

export default Register;