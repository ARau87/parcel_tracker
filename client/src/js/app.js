import routes from './settings/routes';
import axios from 'axios';

const router = new VueRouter({
    routes
});

const app = new Vue({
    router,
    el: '#app',
    beforeMount: () => {
      axios.get('/login')
           .then((response) => {
               if(response && response.data && response.status === 200){
                   this.username = response.data.username;
                   this.isLoggedIn = true;
               }
               else {
                   this.username = '';
                   this.isLoggedIn = false;
               }
           })
          .catch(err => {
              console.error(err);
              this.username = '';
              this.isLoggedIn = false;
          })
    },
    data(){
        return {
            isLoggedIn: false,
            username: '',
        }
    }
});