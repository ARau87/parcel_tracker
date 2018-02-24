export default {
    name: 'step',
    props: ['details'],
    template: `
               <div class="step">
                    <div class="step__type">{{details.stepType}}</div>
                    <div class="step__name">{{details.stepName}}</div>
                    <div class="step__name">{{details.stepLocation}}</div>
                    <div class="step__date">{{details.stepDate}}</div>
               </div>
              `
}