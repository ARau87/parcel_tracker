
const database = require('../database');

module.exports = (app) => {

  app.get('/v1/parcels/:trackingNr', async (req,res) => {

    if(req.session.email && req.session.firstname && req.session.lastname && req.session.city && req.session.address && req.session.postcode){

      let parcel = await database.parcel.get({
                                        trackingNr: req.params.trackingNr,
                                      });

      if(parcel &&
        (parcel.fromFirstName === req.session.firstname || parcel.toFirstName === req.session.firstname ) &&
        (parcel.fromName === req.session.lastname || parcel.toName === req.session.lastname) &&
        (parcel.fromCity == req.session.city || parcel.toCity == req.session.city ) &&
        (parcel.fromAddress === req.session.address || parcel.toAddress === req.session.address) &&
        (parcel.fromPostCode === req.session.postcode || parcel.toPostCode === req.session.postcode)){

        res.status(200).send({message: 'Parcel found!', parcel: parcel});
      }
      else {
        res.status(401).send({message: 'Parcel not found or you are not allowed to access the parcel\'s information'})
      }

    }

    else {
      res.status(401).send({message: 'Forbidden. This service is only available for users who are logged in!'});
    }

  })

}
