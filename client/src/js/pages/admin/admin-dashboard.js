import Components from "../../components";
import {loadAllParcelsAdmin, checkLogin} from "../../common/methods";

const AdminDashboard = {
    components: Components,
    template: `
                <div class="page page__admindashboard">
                
                    <page-header @logout="$router.push('/')" :username="username" :isLoggedIn="isLoggedIn" :admin="true"></page-header>  
                    
                    <main>
                    
                     <h1>Übersicht - Admin</h1>
                     
                     
                     <div class="parcels">
                        <h2>Offene Sendungen</h2>
                        <ul class="parcels__list">
                            <li class="parcels__list__item" v-for="parcel in openParcels">
                                <router-link class="parcel__link" :to="'/parcel/' + parcel.trackingNr">{{parcel.trackingNr}}</router-link>
                            </li>
                        </ul>
                         
                    </div>
                    
                    <div class="parcels">
                        <h2>Abgeschlossene Sendungen</h2>
                        <ul class="parcels__list">
                            <li class="parcels__list__item" v-for="parcel in arrivedParcels">
                                <router-link class="parcel__link" :to="'/parcel/' + parcel.trackingNr">{{parcel.trackingNr}}</router-link>
                            </li>
                        </ul>
                         
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

        this.loadAllParcelsAdmin()
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
            isLoggedIn: true,
            username: '',

            // Parcels
            parcels: []

        }
    },
    methods: {
        checkLogin,
        loadAllParcelsAdmin
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

export default AdminDashboard;