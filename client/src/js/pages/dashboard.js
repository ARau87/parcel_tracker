import {checkLogin} from "../common/methods";
import Components from '../components';

const Home = {
    components: Components,
    template: `
                <div class="page page__dashboard">
                
                    <page-header @logout="$router.push('/')" :isLoggedIn="isLoggedIn"></page-header>
                    
                    <main>
                    
                     <h1>Übersicht</h1>
                     
                     <div class="parcels">
                        <h2>Offene Sendungen</h2>
                        <ul class="parcels__list">
                            <li class="parcels__list__item"></li>
                        </ul>
                         
                    </div>
                    
                    <div class="parcels">
                        <h2>Abgeschlossene Sendungen</h2>
                        <ul class="parcels__list">
                            <li class="parcels__list__item"></li>
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
    },
    data(){
        return {
            // Error and Information messages about the login form
            message: 'Bitte geben Sie ihr Anmeldedaten hier ein:',
            messageType: 100,

            // Currently logged in?
            isLoggedIn: false,
            username: ''

        }
    },
    methods: {
        checkLogin: checkLogin
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
        }
    }
}

export default Home;