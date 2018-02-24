import Components from '../../components';
import {reload} from "../../common/methods";

const AdminHome = {
    components: Components,
    template: `
                <div class="page page__adminhome">
                              
                    <h1>Admin Panel</h1>
                    
                </div>
              `,
    mounted(){
    },
    data(){
        return {

            // Currently logged in?
            isLoggedIn: true,
            username: ''

        }
    },
    methods: {
        reload
    },
    computed: {
    }
}

export default AdminHome;