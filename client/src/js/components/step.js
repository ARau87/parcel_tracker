export default {
    name: 'step',
    props: ['details', 'type'],
    template: `
               <div class="step step-positive" v-if="type === 'type_start'">
                    <div class="step__icon">
                    
                        <i class="ion-android-archive"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
               <div class="step step-positive" v-else-if="type === 'type_logistic'">
                    <div class="step__icon">
                    
                        <i class="ion-android-settings"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
               
               <div class="step step-positive" v-else-if="type === 'type_ontheway'">
                    <div class="step__icon">
                    
                        <i class="ion-android-bus"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
               
               <div class="step  step-negative" v-else-if="type === 'type_notmet'">
                    <div class="step__icon">
                    
                        <i class="ion-android-close"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
               <div class="step step-positive" v-else-if="type === 'type_shop'">
                    <div class="step__icon">
                    
                        <i class="ion-android-expand"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
               <div class="step step-positive" v-else-if="type === 'type_end'">
                    <div class="step__icon">
                    
                        <i class="ion-android-done"></i>
                    
                    </div>
                    <div class="step__details">
                        <div class="step__description">{{details.stepName}}</div>
                        <div class="step__description">{{details.stepLocation}}</div>
                        <div class="step__time">{{hours}}:{{minutes}}</div>
                        <div class="step__date">{{day}}.{{month}}.{{year}}</div>    
                    </div>
               </div>
              `,
    computed: {
        date: function () {
          return new Date(this.details.stepDate);
        },

        day: function(){
            return this.date.getDate();
        },
        month: function(){
            return this.date.getMonth()+1;
        },
        year: function() {
            return this.date.getFullYear();
        },
        hours: function() {
            return this.date.getHours();
        },
        minutes: function() {
            return this.date.getMinutes();
        }

    }
}