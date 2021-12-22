<script>
// CommitChart.js
import { Doughnut } from 'vue-chartjs'
 
export default {
  extends: Doughnut,
  prop :["labelsDate","countsDate"],
  created(){
console.log('labelsDate',this.labelsDate);
  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Amount of Toys',
          backgroundColor: ['#79f479','#f47979','#1939f4','#7979f4'] ,
          data: this.counts
        }
      ]
    })
  },
data () {
    return {
        labels: l,
        counts : c
        // labels: this.labelsDate ? this.labelsDate :["On wheels", "Box game", "Art"],
        // counts : this.countsDate ? this.countsDate :  [23,30,40]
    }
},computed:{
  l(){
    return this.labelsDate || null
  },
  c(){
    return this.countsDate || null
  }
}

}
</script>

<style scoped>

</style>