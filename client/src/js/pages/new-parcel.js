import {autocompletePostalCode, checkLogin} from "../common/methods";
import Components from '../components';
import axios from 'axios';
import _ from "underscore";

const NewParcel = {
    components: Components,
    template: `
                <div class="page page__home">
                
                    <page-header @logout="$router.push('/')" :username="username" :isLoggedIn="isLoggedIn"></page-header>
                    
                    <main class="page__body">
                    
                        <h1>Neue Sendung beantragen</h1>
                    
                        <form class="form">
                            
                            <div class="form__receiver">
                            
                                <h4 class="form__head">Empfängerdaten</h4>
                            
                                <div class="form__message" :style="messageStyle">{{message}}</div>
                            
                                <input class="form__input" v-model="receiverFirstname" placeholder="Vorname" type="text">
                                <input class="form__input" v-model="receiverLastname" placeholder="Nachname" type="text">
                                <input class="form__input" v-model="receiverCity" placeholder="Stadt" type="text" >
                                <input class="form__input" v-model="receiverPostcode" placeholder="PLZ" type="number">
                                <input class="form__input" v-model="receiverAddress" placeholder="Adresse" type="text">
                                
                                
                                
                            </div>
                            
                            <div class="form__sender">
                            
                                <h4 class="form__head">Ansenderdaten</h4>
                            
                                <input class="form__input" v-model="senderFirstname" placeholder="Vorname" type="text">
                                <input class="form__input" v-model="senderLastname" placeholder="Nachname" type="text">
                                <input class="form__input" v-model="senderCity" placeholder="Stadt" type="text">
                                <input class="form__input" v-model="senderPostcode" placeholder="PLZ" type="number">
                                <input class="form__input" v-model="senderAddress" placeholder="Adresse" type="text">
                                
                                
                            </div>
                            
                            <button class="form__button btn-primary" @click.prevent="submit">Abschicken</button>
                            
                        </form>
                    </main>
                    
                </div>
              `,
    mounted(){

        this.checkLogin()
            .then(data => {
                if(data && data.username){
                    this.isLoggedIn = true;
                    this.username = data.username;
                    this.user = data;
                }
                else {
                    this.$router.push('/login');
                }
            });
    },
    data(){
        return {
            // Error and Information messages about the login form
            message: 'Bitte geben Sie ihr Anmeldedaten hier ein:',
            messageType: 100,

            // Currently logged in?
            isLoggedIn: false,
            username: '',
            user: null,

            // Component models
            receiverCity: '',
            receiverLastname: '',
            receiverFirstname: '',
            receiverPostcode: '',
            receiverAddress: '',

            senderCity: '',
            senderLastname: '',
            senderFirstname: '',
            senderPostcode: '',
            senderAddress: '',

            citiesList: [],
            addressList: []

        }
    },
    methods: {
        checkLogin: checkLogin,
        submit: function () {

            if(this.validateInput({
                    firstname: this.receiverFirstname,
                    lastname: this.receiverLastname,
                    address: this.receiverAddress,
                    city: this.receiverCity,
                    postcode: this.receiverPostcode
                })){

                axios.post('/v1/parcels/new', {
                    fromCity: this.senderCity,
                    toCity: this.receiverCity,
                    fromName: this.senderLastname,
                    toName: this.receiverLastname,
                    fromFirstName: this.senderFirstname,
                    toFirstName: this.receiverFirstname,
                    fromPostCode: this.senderPostcode,
                    toPostCode: this.receiverPostcode,
                    fromAddress: this.senderAddress,
                    toAddress: this.receiverAddress
                })
                    .then((response) => {
                        if(response.status === 200){
                            this.message = 'Sendung wurde erfolgreich erstellt';
                            this.messageType = 200;
                            setTimeout(() => {
                                this.$router.push('/parcel/' + response.data.trackingNr + '/created' );
                            }, 500);
                        }
                    })
                    .catch((err) => {
                       console.error(err);
                       this.message = 'Fehler bei der Sendungserstellung.';
                       this.messageType = 400;
                    });
            }

        },
        validateInput: function (input) {
            //TODO: Validate user input
            return true;
        },
    },
    computed: {
        messageStyle: function(){
            if(this.messageType === 400){
                return {
                    color: '#ff0000'
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
    },
    watch: {
        user: function (user) {
            if(user){
                this.senderFirstname = user.firstname;
                this.senderLastname = user.lastname;
                this.senderCity = user.city;
                this.senderAddress = user.address;
                this.senderPostcode = user.postcode;
            }
        }
    }
}

export default NewParcel;