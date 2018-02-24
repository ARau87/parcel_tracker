export default {
    name: 'parcel-details',
    props: ['parcel', 'type'],
    template: `
                           <div class="details" v-if="type === 'receiver'">
                                <h5>Empfänger</h5>
                                <div class="details__firstname">{{parcel.toFirstName}}</div>
                                <div class="details__name">{{parcel.toName}}</div>
                                <div class="details__city">{{parcel.toCity}}</div>
                                <div class="details__postcode">{{parcel.toPostCode}}</div>
                                <div class="details__address">{{parcel.toAddress}}</div>
                            
                           </div>
                           <div class="details" v-else-if="type === 'sender'">
                                <h5>Sender</h5>
                                <div class="details__firstname">{{parcel.fromFirstName}}</div>
                                <div class="details__name">{{parcel.fromName}}</div>
                                <div class="details__city">{{parcel.fromCity}}</div>
                                <div class="details__postcode">{{parcel.fromPostCode}}</div>
                                <div class="details__address">{{parcel.fromAddress}}</div>
                            
                           </div>
                           <div class="details" v-else>
                            Error this template is not defined!!!
                           </div>
                           
    
              `
};