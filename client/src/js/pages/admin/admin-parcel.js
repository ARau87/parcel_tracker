import Components from "../../components";

const AdminParcel = {
    components: Components,
    template: `
                <div class="page page__adminparcel">
                
                    <page-header @logout="$router.push('/')" :username="username" :isLoggedIn="isLoggedIn" :admin="true"></page-header>
                
                    <h1>Parcel Details</h1>
                    
                </div>
              `,
    mounted(){

    },
    data(){
        return {

            // Currently logged in?
            isLoggedIn: false,
            username: '',

            // Parcel details
            details: {}

        }
    },
    methods: {}
    ,
    computed: {
    }
}

export default AdminParcel;