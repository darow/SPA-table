export const paginatedDataComp = Vue.component('paginated-list',{
    data(){
      return {
        pageNumber: 0
      }
    },
    props:{
      objects: {
        type:Array,
        required:true
      },
      size:{
        type:Number,
        required:false,
        default: 3
      }
    },
    methods:{
        nextPage(){
           this.pageNumber++;
        },
        prevPage(){
          this.pageNumber--;
        }
    },
    computed:{
      pageCount(){
        let l = this.objects.length,
            s = this.size;
        return Math.ceil(l/s);
      },
      paginatedData(){
        const start = this.pageNumber * this.size,
              end = start + this.size;
        return this.objects
                 .slice(start, end);
      }
    },
    template: `<tbody>
                <tr
                    v-for="obj in paginatedData"
                    :key="obj.id"
                    >
                    <td>{{ obj.date }}</td>
                    <td>{{ obj.name }}</td>
                    <td>{{ obj.quantity }}</td>
                    <td>{{ obj.length }}</td>
                </tr>
                    <tr style=" width: 100%; display:flex; justify-content: space-between;">
                    <button 
                        class="btn btn-success m-2"
                        :disabled="pageNumber === 0" 
                        @click="prevPage">
                        Previous
                    </button>
                    <button 
                        class="btn btn-success m-2"    
                        :disabled="pageNumber >= pageCount -1" 
                        @click="nextPage">
                        Next
                    </button> 
                </tr> 
               </tbody>
    `
  });
   

