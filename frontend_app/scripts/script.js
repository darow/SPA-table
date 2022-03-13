import { tableComp } from './table.js';


const app = new Vue({
    el: '#app',
    components: {
        'TableComp': tableComp,
    },
    template: `
        <div>  
            <table-comp/>
        </div>
    `,
})
