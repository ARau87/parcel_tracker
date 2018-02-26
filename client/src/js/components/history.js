import Step from './step';

export default {
    components: {
      'step': Step
    },
    name: 'history',
    props: ['parcel'],
    template: `
                        <div class="history">
                            <div class="history__steps">
                                <h4 class="history__head">Sendungshistorie</h4>
                                
                                <div class="history__item" v-for="step in parcel.steps">
                                    <step :details="step" :type="step.stepType"></step>
                                </div>
                            
                            </div>
                            
                            <div class="history_nextstep" v-if="parcel.nextStep">
                                <h4 class="history__head">Nächste Station</h4>
                                
                                <div class="history__nextstep__item"">
                                        <step :details="parcel.nextStep" :type="parcel.nextStep.stepType"></step>
                                </div>
                            
                            </div>
                        </div>
              `

}