import {checkLogin} from "../common/methods";
import Components from '../components';
import axios from 'axios';

const Parcel = {
    components: Components,
    template: `
                <div class="page page__home">
                
                    <page-header @logout="$router.push('/')" :username="username" :isLoggedIn="isLoggedIn"></page-header>
                    
                    <main>
                    
                        <h1>Paket - Sendungsnummer {{$route.params.trackingNr}}</h1>
                        
                        <div class="details">
                            
                            <h4 class="details__head">Details</h4>
                            
                            <div class="details__receiver">
                                <h5>Empfänger</h5>
                                <div class="details__receiver__firstname">{{details.toFirstName}}</div>
                                <div class="details__receiver__name">{{details.toName}}</div>
                                <div class="details__receiver__city">{{details.toCity}}</div>
                                <div class="details__receiver__postcode">{{details.toPostCode}}</div>
                                <div class="details__receiver__address">{{details.toAddress}}</div>
                            
                            </div>
                            
                            <div class="details__sender">
                                <h5>Absender</h5>
                                <div class="details__sender__firstname">{{details.fromFirstName}}</div>
                                <div class="details__sender__name">{{details.fromName}}</div>
                                <div class="details__sender__city">{{details.fromCity}}</div>
                                <div class="details__sender__postcode">{{details.fromPostCode}}</div>
                                <div class="details__sender__address">{{details.fromAddress}}</div>
                            
                            </div>
                            
                            <div class="details__history">
                                <h5>Sendungshistorie</h5>
                                
                                <div class="details__history__item" v-for="step in details.steps">
                                    <div class="step">
                                        <div class="step__type">{{step.stepType}}</div>
                                        <div class="step__name">{{step.stepName}}</div>
                                        <div class="step__name">{{step.stepLocation}}</div>
                                        <div class="step__date">{{step.stepDate}}</div>
                                    </div>
                                </div>
                            
                            </div>
                        
                        </div>
                    
                    </main>
                   
                    
                    
                    
                </div>
              `,
    mounted(){
        this.checkLogin()
            .then(data => {
                if(data && data.username){
                    this.isLoggedIn = true;
                    this.username = data.username;
                }
                else {
                    this.$router.push('/login');
                }
            });

        axios.get('/v1/parcel/' + this.$route.params.trackingNr)
            .then((response) => {
                if(response.status === 200 && response.data && response.data.parcel){
                    this.details = response.data.parcel;
                }
            })
    },
    data(){
        return {

            // Currently logged in?
            isLoggedIn: false,
            username: '',

            // Parcel details
            details: {}

        }
    },
    methods: {
        checkLogin: checkLogin
    },
    computed: {
    }
}

export default Parcel;