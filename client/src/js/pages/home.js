import {checkLogin, getParcelTracking, reload} from "../common/methods";
import Components from '../components';

const Home = {
    components: Components,
    template: `
                <div class="page page__home">
                                   
                    <h1 class="page__home__head col-12">Willkommen beim Parcel-Tracker!</h1>
                    
                    <div class="tracking col-12">
                    
                        <div class="tracking__description col-12">Bitte geben Sie Ihre Sendungsnummer ein:</div>
                    
                        <div class="tracking__message col-12">{{message}}</div>
                        <form class="tracking__form">
                        
                             <input class="tracking__form__input" type="text" v-model="trackingNr">
                             <button class="tracking__form__button" @click="searchTrackingNumber">Suchen</button>
                                            
                        </form>
                    </div>
                    
                </div>
              `,
    mounted(){
      this.checkLogin()
          .then(data => {
              if(data && data.username){
                  this.isLoggedIn = true;
                  this.username = data.username;
                  this.$emit('logged-in');
              }
          });
    },
    data(){
        return {

            // Currently logged in?
            isLoggedIn: false,
            username: '',

            trackingNr: '',
            message: ''

        }
    },
    methods: {
        checkLogin,
        reload,
        searchTrackingNumber: function () {
            getParcelTracking(this.trackingNr).then(response => {
                if(response.status === 200){
                    this.$router.push('/tracking/' + this.trackingNr);
                }
                else {
                        this.message = 'Eine Sendung mit dieser Nummer ist nicht in unserem System verzeichnet. ' +
                            'Bitte überprüfen Sie Ihre Eingabe oder wenden Sie sich an den Kundendienst!';
                }
            }).catch(err => {
                    this.message = 'Eine Sendung mit dieser Nummer ist nicht in unserem System verzeichnet. ' +
                        'Bitte überprüfen Sie Ihre Eingabe oder wenden Sie sich an den Kundendienst!';
            });

        }
    },
    computed: {
    }
}

export default Home;