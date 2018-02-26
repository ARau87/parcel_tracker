import Components from "../../components";
import {addStep, checkLogin, endParcel, getParcelDetailsAdmin} from "../../common/methods";

const AdminParcel = {
    components: Components,
    template: `
                <div class="page page__adminparcel">
                                    
                    <main>
                    
                        <h1>Paket - Sendungsnummer {{$route.params.trackingNr}}</h1>
                        
                        <div v-if="!ended" class="edit">
                            <h4 class="edit__head">Sendung ändern</h4>
                            
                            <div class="edit__addstep">
                                <h5 class="edit__addstep__head">Station hinzufügen</h5>
                                
                                <form class="edit__addstep__form">
                                
                                    <select class="edit__select" v-model="stepType">
                                        <option value="-1" selected="selected">Aktion...</option>
                                        <option v-if="!started" value="type_start">Sendung wurde aufgegeben</option>
                                        <option value="type_logistic">Paket im Logistikzentrum</option>
                                        <option value="type_notmet">Empfänger nicht angetroffen</option>
                                        <option value="type_ontheway">Sendung ist auf dem Weg nach</option>
                                        <option value="type_shop">Sendung ist im Paketshop</option>
                                        <option value="type_toyou">Sendung befindet sich in Zustellung</option>
                                    </select>
                                    
                                    <input class="edit__input" type="text" v-model="stepLocation" placeholder="Standort der Sendung">
                                    
                                    <input class="edit__input input-fullwidth" type="text" v-model="stepName">
                                    
                                    <button class="edit__button" @click.prevent="submit">Abschicken</button>
                                                             
                                </form>
                                
                            
                            </div> 
                            
                            <div class="edit__end">
                                <h5 class="edit__end__head">Sendung abschließen</h5>
                                
                                <form class="edit__end__form">
                               
                                    
                                    <button class="button button-primary" @click.prevent="endDelivery">Sendung abschließen</button>
                                                             
                                </form>
                                
                            
                            </div>  
                        
                        </div>
                        
                        <div class="details">
                            
                            <h4 class="details__head">Details</h4>
                            
                            <div class="details__addresses">
                            
                                <parcel-details :parcel="details" :type="'receiver'"></parcel-details>
                                <parcel-details :parcel="details" :type="'sender'"></parcel-details>
                         
               
                            </div>
                            
                            <history :parcel="details"></history>
                        
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


        this.getParcelDetailsAdmin(this.$route.params.trackingNr)
            .then((response) => {
                if(response.status === 200 && response.data && response.data.parcel){

                    this.details = response.data.parcel;
                }
            });



    },
    data(){
        return {

            // Currently logged in?
            isLoggedIn: false,
            username: '',

            // Parcel details
            details: {},
            stepName: '',
            stepType: '',
            stepLocation: '',
            started: false,
            ended: false

        }
    },
    methods: {

        validateInput: (stepName, stepType, stepLocation) => {
            //TODO: Validate user input
            return true;
        },
        submit: function ()  {
            if(this.validateInput(this.stepName, this.stepType, this.stepLocation)){
                addStep(this.details.trackingNr, {
                    stepName: this.stepName,
                    stepLocation: this.stepLocation,
                    stepType: this.stepType
                }).then((response) => {
                    if(response.status === 200){
                        window.location.reload();
                    }
                });
            }
        },
        endDelivery: function() {
            endParcel(this.details.trackingNr).then((response) => {
                if(response.status === 200){
                    window.location.reload();
                }
            });
        },
        checkLogin,
        getParcelDetailsAdmin,
        gotoParcel: function (trackingNr) {
            this.$router.push('/parcel/' + trackingNr);
            return;
        }
    }
    ,
    computed: {

    },
    watch: {
        details: function(parcel){
            for(let step of parcel.steps){
                if(step.stepType == 'type_start'){
                    this.started = true;
                }
                if(step.stepType == 'type_end'){
                    this.ended = true;
                }
            }
            if(parcel.nextStep && parcel.nextStep.stepType == 'type_start'){
                this.started = true;
            }
        },
        stepType: function(val) {
            if(this.stepType && this.stepLocation){
                if(this.stepType == 'type_start'){
                    this.stepName = 'Das Packet wurde in ' + this.stepLocation + ' abgegeben!';
                }
                if(this.stepType == 'type_logistic'){
                    this.stepName = 'Das Packet ist im Logistikzentrum in ' + this.stepLocation + ' angekommen!';
                }
                if(this.stepType == 'type_notmet'){
                    this.stepName = 'Das Packet konnte nicht zugestellt werden!';
                }
                if(this.stepType == 'type_ontheway'){
                    this.stepName = 'Das Packet ist auf dem Weg nach ' + this.stepLocation;
                }
                if(this.stepType == 'type_shop'){
                    this.stepName = 'Das Packet ist im Packetshop ' + this.stepLocation + ' abgegben worden und zur Abholung bereit!';
                }
                if(this.stepType == 'type_toyou'){
                    this.stepName = 'Das Packet befindet sich in Zustellung!';
                }
            }
        },
        stepLocation: function(val) {
            if(this.stepType && this.stepLocation){
                if(this.stepType == 'type_start'){
                    this.stepName = 'Das Packet wurde in ' + this.stepLocation + ' abgegeben!';
                }
                if(this.stepType == 'type_logistic'){
                    this.stepName = 'Das Packet ist im Logistikzentrum in ' + this.stepLocation + ' angekommen!';
                }
                if(this.stepType == 'type_notmet'){
                    this.stepName = 'Das Packet konnte nicht zugestellt werden!';
                }
                if(this.stepType == 'type_ontheway'){
                    this.stepName = 'Das Packet ist auf dem Weg nach ' + this.stepLocation;
                }
                if(this.stepType == 'type_shop'){
                    this.stepName = 'Das Packet ist im Packetshop ' + this.stepLocation + ' abgegben worden und zur Abholung bereit!';
                }
                if(this.stepType == 'type_toyou'){
                    this.stepName = 'Das Packet befindet sich in Zustellung!';
                }
            }
        }
    }
}

export default AdminParcel;