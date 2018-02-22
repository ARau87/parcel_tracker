'use strict';

const database = require('../database');
const trackingNrCreator = require('../misc/tracking_number_creator');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = (app) => {


  /** GET /v1/parcels/:trackingNr
    *
    * This endpoint returns details of a parcel with a specific tracking number.
    * This service requires the user to be logged in and the parcel needs to be
    * related to the currently logged in user.
    */
  app.get('/v1/parcel/:trackingNr', async (req,res) => {

    if(req.session.email && req.session.firstname && req.session.lastname && req.session.city && req.session.address && req.session.postcode){

      let parcel = await database.parcel.get({
                                        trackingNr: req.params.trackingNr,
                                      });
      // Check if the parcel is related to the currently logged in user
      if(parcel &&
        (parcel.fromFirstName === req.session.firstname || parcel.toFirstName === req.session.firstname ) &&
        (parcel.fromName === req.session.lastname || parcel.toName === req.session.lastname) &&
        (parcel.fromCity == req.session.city || parcel.toCity == req.session.city ) &&
        (parcel.fromAddress === req.session.address || parcel.toAddress === req.session.address) &&
        (parcel.fromPostCode === req.session.postcode || parcel.toPostCode === req.session.postcode)){

        res.status(200).send({message: 'Success. Parcel found!', parcel: parcel});
      }
      else {
        res.status(401).send({message: 'Parcel not found or you are not allowed to access the parcel\'s information'})
      }

    }

    else {
      res.status(401).send({message: 'Forbidden. This service is only available for authenticated users!'});
    }

  });

  /** POST /v1/parcels/new
    *
    * Using this endpoint will create a new parcel with a fresh tracking number.
    * The tracking number is saved in the trackingnr collection the parcel in the
    * parcel collection.
    *
    */
  app.post('/v1/parcels/new', jsonParser ,async (req,res) => {

    if(req.session.email && req.session.firstname && req.session.lastname && req.session.city && req.session.address && req.session.postcode){

      if(req.body && req.body.fromCity && req.body.toCity && req.body.fromName && req.body.toName && req.body.fromFirstName && req.body.toFirstName && req.body.fromPostCode && req.body.toPostCode && req.body.fromAddress && req.body.toAddress ){

        try {
          let tracking = await trackingNrCreator.create({...req.body});

          await database.trackingnr.create({
            ...tracking
          });

          let parcel = await database.parcel.create({
            trackingNr: tracking.trackingNr,
            ...req.body
          });

          await database.user.addParcel({email: req.session.email}, {trackingNr: tracking.trackingNr});

          if(parcel){
            res.status(200).send({message: 'Success. Parcel created!'});
          }
          else {
            res.status(404).send({message: 'Bad request.'});
          }
        }

        catch(err) {
          res.status(500).send({message: 'Internal server error!'});
        }

      }

      else {
        res.status(404).send({message: 'Bad request. Not all required parameters were provided!'});

      }
    }
    else {
      res.status(401).send({message: 'Forbidden. This service is only available for authenticated users!'});
    }
  });


  /** GET /v1/parcels/all
    *
    * This endpoint returns all parcels related to the logged in user or all parcels if the user
    * is an admin.
    *
    */
  app.get('/v1/parcels/all', async (req,res) => {
    if(req.session.email && req.session.firstname && req.session.lastname && req.session.city && req.session.address && req.session.postcode){

        try {
              let user = await database.user.get({email: req.session.email});
              let parcels = [];
              if(user){

                  for(let parcel of user.parcels){
                      let parcelDetailed = await database.parcel.get({trackingNr: parcel.trackingNr});

                      if(parcelDetailed){
                          parcels.push(parcelDetailed);
                      }
                  }

                  res.status(200).send({message: 'Success. Parcels found in database.', parcels: [...parcels]});
              }
              else {
                  res.status(401).send({message: 'Forbidden. User not found!'});
              }
        }
          catch(err){
              console.error(err);
              res.status(500).send({message: 'Internal server error!'});
          }

    }
    else {
      res.status(401).send({message: 'Forbidden. This service is only available for authenticated users!'});
    }

  });

    /** POST /v1/parcels/all
     *
     * This endpoint returns all parcels if the user is an admin.
     *
     */
    app.post('/v1/parcels/all', async (req,res) => {
        if(req.session.email && req.session.firstname && req.session.lastname && req.session.city && req.session.address && req.session.postcode){

            // Normal users can only load their own parcels
            if(!req.session.admin){
                try {
                    let user = await database.user.get({email: req.session.email});
                    let parcels = [];
                    if(user){

                        for(let parcel of user.parcels){
                            let parcelDetailed = await database.parcel.get({trackingNr: parcel.trackingNr});

                            if(parcelDetailed){
                                parcels.push(parcelDetailed);
                            }
                        }

                        res.status(200).send({message: 'Success. Parcels found in database.', parcels: [...parcels]});
                    }
                    else {
                        res.status(401).send({message: 'Forbidden. User not found!'});
                    }
                }
                catch(err){
                    console.error(err);
                    res.status(500).send({message: 'Internal server error!'});
                }
            }

            // Admins can see all parcels
            if(req.session.admin) {
                try {

                    let user = await database.user.get({email: req.session.email});

                    // Double-check if user is admin
                    if(user.admin){
                        try {
                            let parcels = await database.parcel.getAll();

                            res.status(200).send({parcels: parcels});
                        }
                        catch(err){
                            console.error(err);
                            res.status(500).send({message: 'Internal Server Error!'});
                        }
                    }

                }
                catch(err){
                    console.error(err);
                    res.status(500).send({message: 'Internal Server Error!'});
                }
            }
            else {
                res.status(401).send({message: 'Forbidden. You need to be logged in and be administrator to request this resource'});
            }

        }
        else {
            res.status(401).send({message: 'Forbidden. This service is only available for authenticated users!'});
        }

    });



  /** PUT /v1/parcel/:trackingNr/step
    *
    * This endpoint adds a step to the parcel specified in the route
    *
    */
  app.put('/v1/parcel/:trackingNr/step', jsonParser , async (req,res) => {
    if(req.session.email && req.session.firstname && req.session.lastname && req.session.city && req.session.address && req.session.postcode && req.session.admin){

      if(req.body && req.body.stepLocation && req.body.stepName && req.body.stepType){

        try{
          await database.parcel.addStep({trackingNr: req.params.trackingNr},
              {
                  stepName: req.body.stepName,
                  stepLocation: req.body.stepLocation,
                  stepType: req.body.stepType
              });

          res.status(200).send({message: 'Success. Step added to the parcel instance.'});
        }
        catch(err){
          console.error(err);
          res.status(500).send({message: 'Internal server error!'});
        }
      }

    }
    else {
      res.status(401).send({message: 'Forbidden. This service is only available for authenticated users!'});
    }

  });

    /** POST /v1/parcel/:trackingNr/end
     *
     * This endpoint ends the delivery by setting the parcel to arrived
     * and pushing the nextStep to steps and leave it empty.
     *
     */
    app.post('/v1/parcel/:trackingNr/end', jsonParser , async (req,res) => {
        if(req.session.email && req.session.firstname && req.session.lastname && req.session.city && req.session.address && req.session.postcode){

          try{
            await database.parcel.end({trackingNr: req.params.trackingNr});
            res.status(200).send({message: 'Success. Step added to the parcel instance.'});
          }
          catch(err){
            console.error(err);
            res.status(500).send({message: 'Internal server error!'});
          }
        }
        else {
            res.status(401).send({message: 'Forbidden. This service is only available for authenticated users!'});
        }

    });

}
