export default {
    name: 'parcel-details',
    props: ['parcel', 'type'],
    template: `
                           <div class="address" v-if="type === 'receiver'">
                                <h5 class="address__head">Empfänger</h5>
                                <div class="address__details">
                                    <div class="address__details__item">{{parcel.toFirstName}}</div>
                                    <div class="address__details__item">{{parcel.toName}}</div>
                                    <div class="address__details__item">{{parcel.toCity}}</div>
                                    <div class="address__details__item">{{parcel.toPostCode}}</div>
                                    <div class="address__details__item">{{parcel.toAddress}}</div>
                                
                                </div>
                           </div>
                           <div class="address" v-else-if="type === 'sender'">
                                <h5 class="address__head">Sender</h5>
                                
                                <div class="address__details">
                                
                                    <div class="address__details__item">{{parcel.fromFirstName}}</div>
                                    <div class="address__details__item">{{parcel.fromName}}</div>
                                    <div class="address__details__item">{{parcel.fromCity}}</div>
                                    <div class="address__details__item">{{parcel.fromPostCode}}</div>
                                    <div class="address__details__item">{{parcel.fromAddress}}</div>
             
                                </div>
                           </div>
                           <div class="address" v-else>
                            Error this template is not defined!!!
                           </div>
                           
    
              `
};