import {checkLogin, reload} from "../common/methods";
import Components from '../components';

const Home = {
    components: Components,
    template: `
                <div class="page page__home">
                                   
                    <h1>Willkommen beim Parcel-Tracker!</h1>
                    
                </div>
              `,
    mounted(){
      this.checkLogin()
          .then(data => {
              if(data && data.username){
                  this.isLoggedIn = true;
                  this.username = data.username;
              }
          });
    },
    data(){
        return {

            // Currently logged in?
            isLoggedIn: false,
            username: ''

        }
    },
    methods: {
        checkLogin,
        reload
    },
    computed: {
    }
}

export default Home;