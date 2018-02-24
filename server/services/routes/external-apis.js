const axios = require('axios');
const latinize = require('latinize');

module.exports = (app) => {

    app.get('/v1/api/autocomplete/cities', async (req,res) => {

        let apiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + req.query.partOfCity +'&types=(cities)&language=de&components=country%3ADE&key=AIzaSyDpVNeIPCFt-L7yPqLZP-SCSEf1F41qBdM';
        try {
            let response = await axios({
                url: apiUrl,
                method: 'get',
            });

            res.status(200).send({message: 'Success', predictions: response.data.predictions});
        }
        catch(err){
            res.status(500).send({message: 'Internal server error!'});
        }

    });


    app.get('/v1/api/autocomplete/address', async (req,res) => {

        if(req.query.partOfAddress && req.query.city){
            let apiUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + req.query.city +'+'+req.query.partOfAddress+'&types=address&language=de&components=country%3ADE&key=AIzaSyDpVNeIPCFt-L7yPqLZP-SCSEf1F41qBdM';
            try {
                let response = await axios({
                    url: apiUrl,
                    method: 'get',
                });

                res.status(200).send({message: 'Success', predictions: response.data.predictions});
            }
            catch(err){
                res.status(500).send({message: 'Internal server error!'});
            }
        }
        else {
            res.status(404).send({message: 'Bad request!'});
        }

    });

    app.get('/v1/api/autocomplete/postalcode', async (req,res) => {

        if(req.query.address && req.query.city){
            let apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ req.query.address +'+'+ req.query.city +'&components=country%3ADE&key=AIzaSyDpVNeIPCFt-L7yPqLZP-SCSEf1F41qBdM'
            try {
                let response = await axios({
                    url: apiUrl,
                    method: 'get',
                });

                response.data.results[0].address_components.forEach(component => {
                    if(component.types.indexOf('postal_code')){
                        res.status(200).send({message: 'Success', predictions: response.data.results[0].address_components.component.types[0]});
                    }
                });

                res.status(404).send({message: 'Not found!'});
            }
            catch(err){
                res.status(500).send({message: 'Internal server error!'});
            }
        }
        else {
            res.status(404).send({message: 'Bad request!'});
        }

    });

}