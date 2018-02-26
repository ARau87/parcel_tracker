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
               <div class="step step-positive" v-else-if="type === 'type_toyou'">
                    <div class="step__icon">
                    
                        <i class="ion-android-walk"></i>
                    
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
            let day = this.date.getDate();
            if(day < 10){
                return '0' + day;
            }
            return day;
        },
        month: function(){

            let month = this.date.getMonth()+1;
            if(month < 10){
                return '0' + month;
            }
            return month;
        },
        year: function() {

            return this.date.getFullYear();
        },
        hours: function() {

            let hours = this.date.getHours();
            if(hours < 10){
                return '0' + hours;
            }
            return hours;
        },
        minutes: function() {

            let minutes = this.date.getMinutes();
            if(minutes < 10){
                return '0' + minutes;
            }
            return minutes;
        }

    }
}