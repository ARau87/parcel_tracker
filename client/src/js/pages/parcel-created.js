import {checkLogin, getParcelDetails} from "../common/methods";
import Components from '../components';
import QRCode from 'qrcode';

const ParcelCreated = {
    components: Components,
    template: `
                <div class="page page__home">
                
                    <main>
                    
                        <h1>Ihre Sendung wurde erstellt! - Buchungsübersicht</h1>
                        
                        <div class="qrcode">
                            <h4 class="qrcode__head">Scannen Sie den folgenden Barcode um den aktuellen Status ihrer Sendung zu verfolgen:</h4>
                        
                            <canvas id="qrcode" height="200" width="200">
                            
                            </canvas>
                        </div>
                        
                        <div class="details">
                            
                            <h4 class="details__head">Details</h4>
                            
                            <div class="details__addresses">
                            
                                <parcel-details :parcel="details" :type="'receiver'"></parcel-details>
                                <parcel-details :parcel="details" :type="'sender'"></parcel-details>

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
                    this.$emit('logged-in');
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
            // Parcel details
            details: {},
            username: '',
            isLoggedIn: false

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