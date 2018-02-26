import {checkLogin, loadAllParcels} from "../common/methods";
import Components from '../components';
import axios from 'axios';

const Home = {
    components: Components,
    template: `
                <div class="page page__dashboard">
                                   
                    <main>
                    
                     <h1>Übersicht</h1>
                     
                     <div class="parcels">
                        <h2>Neue Sendung</h2> 
                        
                        <div class="parcel__new">
                            <router-link class="parcels__new__link" to="/new-parcel">Neue Sendung beantragen</router-link>
                        </div>
                        
                     </div>
                     
                     <div class="parcels">
                        <h2>Offene Sendungen</h2>
                        <ul class="parcels__list container">
                            <li class="parcels__list__item" v-for="parcel in openParcels">
                                <router-link class="parcel__link" :to="'/parcel/' + parcel.trackingNr">{{parcel.trackingNr}}</router-link>
                            </li>
                        </ul>
                         
                    </div>
                    
                    <div class="parcels">
                        <h2>Abgeschlossene Sendungen</h2>
                        <ul class="parcels__list container">
                            <li class="parcels__list__item" v-for="parcel in arrivedParcels">
                                <router-link class="parcel__link" :to="'/parcel/' + parcel.trackingNr">{{parcel.trackingNr}}</router-link>
                            </li>
                        </ul>
                         
                    </div>
                    
                    
                    </main>
                    
                </div>
              `,
    mounted(){
        // Check if user is logged in.
        this.checkLogin()
            .then(data => {
                if(data && data.username){
                    this.isLoggedIn = true;
                    this.username = data.username;
                    this.$emit('logged-in');
                }
                else {
                    this.$router.push('/login');
                }
            });

        this.loadAllParcels()
            .then((response) => {
                if(response.status === 200 && response.data && response.data.parcels){
                    this.parcels = response.data.parcels;
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

            // Parcels
            parcels: []

        }
    },
    methods: {
        checkLogin,
        loadAllParcels

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
        },
        openParcels: function () {
            return this.parcels.filter((parcel) => !parcel.arrived);
        },
        arrivedParcels: function () {
            return this.parcels.filter((parcel) => parcel.arrived);
        }

    }
}

export default Home;