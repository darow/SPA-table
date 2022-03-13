import { tableComp } from './table.js';
import { filterComp } from './inputs.js';


const app = new Vue({
    el: '#app',
    components: {
        'TableComp': tableComp,
    },
    template: `
        <div>  
            <table-comp></table-comp>
        </div>
    `,
})
