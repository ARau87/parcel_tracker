import axios from 'axios';

// Check if a valid session for the current client exists
export const checkLogin = function () {
    return axios.get('/login')
                 .then((response) => {
                    if(response && response.data && response.status === 200){
                        return response.data;
                    }
                    else {
                        return null
                    }
                })
                .catch(err => {
                    return null;
                });
};