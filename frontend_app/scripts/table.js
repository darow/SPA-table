import { filterComp } from './inputs.js';

export const tableComp = {
    components : {
        'FilterInputs': filterComp,
    },
    template: `
        <div class="container">
            <div class="row">
                <filter-inputs
                    @make-filter="handleMakeFilter"
                    :fieldNames="fieldNames"
                    :makeFilter="makeFilter"
                />
            
                <table
                    :class="vari"
                >
                    <thead>
                        <tr>
                            <td
                                v-bind:class="{ 'bg-warning': fieldName != 'date', 'bg-secondary': fieldName == 'date' }"
                                v-for="fieldName in fieldNames"
                                :key="fieldName"
                                @click="makeSort(fieldName)"
                            >
                                {{ fieldName }}
                            </td>
                        </tr>
                    </thead>
                    <div class="vue-here">

                    </div>
                    <tr
                        v-for="obj in objects"
                        :key="obj.id"
                    >
                        <td>{{ obj.date }}</td>
                        <td>{{ obj.name }}</td>
                        <td>{{ obj.quantity }}</td>
                        <td>{{ obj.length }}</td>
                    </tr>
                </table>
            </div>
        </div>
    `,
    data: function() {
        return {
            asdfasdfsfd: false,
            fieldNames: ["date", "name", "quantity", "length"],
            url: "http://127.0.0.1:8000/objects/",
            orderBy: "",
            filterParams: { field: "", cond:"", value: "" },
            objects: [{ "id": 0, "date": "", "name": "", "quantity": 0, "length": 0 }],
        };
    },
    methods: {
        updateData() {
            const url = `${this.url}?order_by=${this.orderBy}&filter_field=${this.filterParams.field}&filter_cond=${this.filterParams.cond}&filter_val=${this.filterParams.value}`
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.objects = data;
                });
        },
        makeSort(sortBy) {
            if (sortBy === 'date') return;
            if (this.orderBy === sortBy) {
                this.orderBy = `-${sortBy}`;
            } else {
                this.orderBy = sortBy;
            }
            this.updateData();
        },
        handleMakeFilter(field, cond, value) {
            this.filterParams.field = field
            this.filterParams.cond = cond
            this.filterParams.value = value
            this.updateData();
        },
    },
    created: function () {
        this.updateData();
    },
};
