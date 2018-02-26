import {checkLogin, getParcelTracking} from "../common/methods";
import Components from '../components';

const Parcel = {
    components: Components,
    template: `
                <div class="page page__home">
                
                  <main>
                    
                        <h1>Paket - Sendungsnummer {{$route.params.trackingNr}}</h1>
                        
                        <div class="details">
                            
                            <h4 class="details__head">Details</h4>
                            
                             <div class="details_currentstep" v-if="details.currentStep">
                                <h5>Letzte Station</h5>
                                
                                <step :details="details.currentStep" :type="details.currentStep.stepType"></step>
                            
                            </div>
                            
                            
                            <div class="details_nextstep" v-if="details.nextStep">
                                <h5>Aktuelle Station</h5>
                                
                                <step :details="details.nextStep" :type="details.nextStep.stepType"></step>
                            
                            </div>
                        
                        </div>
                    
                    </main>
                   
                    
                    
                    
                </div>
              `,
    mounted(){

        this.getParcelTracking(this.$route.params.trackingNr)
            .then((response) => {
                if(response.status === 200 && response.data && response.data.parcel){
                    this.details = response.data.parcel;
                }
            });

    },
    data(){
        return {

            // Parcel details
            details: {}

        }
    },
    methods: {
        getParcelTracking
    },
    computed: {
    }
}

export default Parcel;