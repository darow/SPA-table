export const filterComp = {
    template: `
        <div>
            <form class="m-3">
                <label for="field-inp">поле:</label><br>
                <select name="" id="field-inp" 
                    @change="changeField($event)"
                    >
                <option
                    v-for="val in fieldNames"
                    :key=val
                    :value="val"
                >
                    {{ val }}
                </option>
                </select><br>
                <label for="field-inp" class="mt-3">условие:</label><br>
                <select name="" id="cond-inp"
                    @change="changeCond($event)"
                >
                <option
                    v-for="val in conditions"
                    :key=val
                    :value="val"
                >
                    {{ val }}
                </option>
                </select><br>
                <label for="val-inp" class="mt-3">значение:</label><br>

                <input type="text" id="val-inp"
                    @change="changeVal($event)"
                    /><br>
                <div class="btn btn-primary m-3" @click="makeFilter(field, cond, value)">Отфильтровать</div> <br>
                <div class="btn btn-secondary m-3" @click="makeFilter('', '', '')">Сбросить фильтры</div> 
            </form>
        </div>
    
    `,
    props: {
        fieldNames: {
            type: Array,
            default: () => [],
        },
        makeFilter: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        return {
            field: '',
            cond: '',
            value: '',
            conditions: ["equal", "contains", "more", "less"],
        };
    },
    methods: {
        changeField(e) {
            this.field = e.target.value
        },
        changeCond(e) {
            this.cond = e.target.value
        },
        changeVal(e) {
            this.value = e.target.value
        },
    },
    created() {
        if (this.fieldNames.length > 0) {
            this.field = this.fieldNames[0];
        }
        if (this.conditions.length > 0) {
            this.cond = this.conditions[0];
        }
    },
};
