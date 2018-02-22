import Components from "../../components";
import {addStep, checkLogin, endParcel, getParcelDetailsAdmin} from "../../common/methods";

const AdminParcel = {
    components: Components,
    template: `
                <div class="page page__adminparcel">
                
                    <page-header @logout="$router.push('/')" :username="username" :isLoggedIn="isLoggedIn" :admin="true"></page-header>
                    
                    <main>
                    
                        <h1>Paket - Sendungsnummer {{$route.params.trackingNr}}</h1>
                        
                        <div v-if="!ended" class="edit">
                            <h4 class="edit__head">Sendung ändern</h4>
                            
                            <div class="edit__addstep">
                                <h5 class="edit__addstep__head">Station hinzufügen</h5>
                                
                                <form class="edit__addstep__form">
                                
                                    <select class="edit__addstep__type" v-model="stepType">
                                        <option value="-1" selected="selected">Aktion...</option>
                                        <option v-if="!started" value="type_start">Sendung wurde aufgegeben</option>
                                        <option value="type_logistic">Paket im Logistikzentrum</option>
                                        <option value="type_notmet">Empfänger nicht angetroffen</option>
                                        <option value="type_ontheway">Sendung ist auf dem Weg nach</option>
                                    </select>
                                    
                                    <input type="text" v-model="stepLocation" placeholder="Standort der Sendung">
                                    
                                    <input type="text" v-model="stepName">
                                    
                                    <button class="button button-primary" @click.prevent="submit">Abschicken</button>
                                                             
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
                            
                            <div class="details_nextstep" v-if="details.nextStep">
                                <h5>Nächste Station</h5>
                                
                                <div class="details__nextstep__item"">
                                    <div class="step">
                                        <div class="step__type">{{details.nextStep.stepType}}</div>
                                        <div class="step__name">{{details.nextStep.stepName}}</div>
                                        <div class="step__name">{{details.nextStep.stepLocation}}</div>
                                        <div class="step__date">{{details.nextStep.stepDate}}</div>
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
            }
        }
    }
}

export default AdminParcel;