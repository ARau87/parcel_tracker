import {checkLogin, getParcelDetails} from "../common/methods";
import Components from '../components';
import QRCode from 'qrcode';

const Parcel = {
    components: Components,
    template: `
                <div class="page page__home">
                    
                    <main>
                    
                        <h1>Paket - Sendungsnummer {{$route.params.trackingNr}}</h1>
                        
                        <div class="qrcode">
                            <h4 class="qrcode__head">Drucken Sie den folgenden QR-Code aus um schnell auf den aktuellen Status ihrer Lieferung zugreifen zu können:</h4>
                        
                            <canvas id="qrcode" height="200" width="200">
                            
                            </canvas>
                        </div>
                        
                        <div class="details">
                            
                            <h4 class="details__head">Details</h4>
                            
                            <parcel-details :parcel="details" :type="'receiver'"></parcel-details>
                            <parcel-details :parcel="details" :type="'sender'"></parcel-details>
                          
                            <history :parcel="details"></history>
                        
                        </div>
                    
                    </main>
                   
                    
                    
                    
                </div>
              `,
    mounted(){

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

export default Parcel;