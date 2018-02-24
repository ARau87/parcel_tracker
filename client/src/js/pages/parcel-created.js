import {checkLogin, getParcelDetails} from "../common/methods";
import Components from '../components';
import QRCode from 'qrcode';

const ParcelCreated = {
    components: Components,
    template: `
                <div class="page page__home">
                
                    <page-header @logout="$router.push('/')" :username="username" :isLoggedIn="isLoggedIn"></page-header>
                    
                    <main>
                    
                        <h1>Ihre Sendung wurde erstellt! - Buchungsübersicht</h1>
                        
                        <div class="qrcode">
                            <h4 class="qrcode__head">Scannen Sie den folgenden Barcode um den aktuellen Status ihrer Sendung zu verfolgen:</h4>
                        
                            <canvas id="qrcode" height="200" width="200">
                            
                            </canvas>
                        </div>
                        
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

        this.getParcelDetails(this.$route.params.trackingNr)
            .then((response) => {
                if(response.status === 200 && response.data && response.data.parcel){
                    this.details = response.data.parcel;
                }
            });

        this.generateQRCode(this.$route.params.trackingNr, 'qrcode')
            .catch(err => {
                console.error(err);
            });
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
        checkLogin,
        getParcelDetails,
        generateQRCode: function (trackingNr, canvasId) {
            let baseUrl = window.location.protocol + '//' + window.location.host + '/#/tracking/' + trackingNr;
            return QRCode.toCanvas(document.getElementById(canvasId), baseUrl);
        }
    },
    computed: {
    }
}

export default ParcelCreated;