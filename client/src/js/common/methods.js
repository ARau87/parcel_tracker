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
                            city: response.data.city,
                            admin: response.data.admin
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

export const logout = function () {

    return axios({
        method: 'get',
        url: '/logout',
        headers: {
            'Cache-Control': 'no-store'
        }

    });

};

export const reload = function () {

    let baseUrl = document.referrer.split('/');
    baseUrl.splice(baseUrl.length-2, 2);

    window.location.href = baseUrl;

};

export const loadAllParcels = function(){

    return axios.get('/v1/parcels/all');

};

export const loadAllParcelsAdmin = function(){

    return axios.post('/v1/parcels/all');

};

export const getParcelDetails = function(trackingNr){

  return axios.get('/v1/parcel/' + trackingNr);

};

export const getParcelDetailsAdmin = function(trackingNr){

    return axios.post('/v1/parcel/' + trackingNr);

};

export const addStep = function (trackingNr, step) {
    if(step && step.stepType && step.stepLocation && step.stepName){
        return axios.put('/v1/parcel/'+ trackingNr +'/step', {
            stepName: step.stepName,
            stepType: step.stepType,
            stepLocation: step.stepLocation,
            stepDate: Date.now()
        });
    }
};

export const endParcel = async function (trackingNr) {

    await addStep(trackingNr, {
        stepName: 'Ihre Sendung wurde abgeschlossen!',
        stepType: 'type_end',
        stepLocation: ' ',
        stepDate: Date.now()
    });

    return await axios.post('/v1/parcel/'+ trackingNr +'/end');
};

export const getParcelTracking = function (trackingNr) {

    return axios.get('/v1/parcel/status/' + trackingNr);
};