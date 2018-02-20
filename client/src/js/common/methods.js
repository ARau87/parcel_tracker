import axios from 'axios';

// Check if a valid session for the current client exists
export const checkLogin = function () {
    return axios.get('/login')
                 .then((response) => {
                    if(response && response.data && response.status === 200){
                        return {
                            username: response.data.email,
                            firstname: response.data.firstname,
                            lastname: response.data.lastname,
                            address: response.data.address,
                            postcode: response.data.postcode,
                            city: response.data.city
                        };
                    }
                    else {
                        return null
                    }
                })
                .catch(err => {
                    return null;
                });
};