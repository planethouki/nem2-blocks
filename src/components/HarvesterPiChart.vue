<template>
  <div>
    <GChart
      v-if="blocks.length > 0"
      :settings="{ packages: ['corechart'] }"
      type="PieChart"
      :data="harvesterPiChartData"
      :options="harvesterPiChartOptions"
    />
    <div v-else class="p-3">
      <h6>Harvester Pi Chart</h6>
      <div class="text-center">
        <b-spinner type="grow" label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  name: 'HarvesterPiChart',
  components: { GChart },
  props: {
    blocks: {
      type: Array,
      required: true
    }
  },
  computed: {
    harvesterPiChartOptions() {
      return {
        title: `Harvester (last ${this.blocks.length} blocks)`
      }
    },
    signerToCount() {
      if (this.blocks.length === 0) {
        return {}
      }
      const signerToCount = {}
      for (const b of this.blocks) {
        if (signerToCount[b.block.signerPublicKey] === undefined) {
          signerToCount[b.block.signerPublicKey] = {
            harvestCount: 1,
            totalFee: Number(b.meta.totalFee)
          }
        } else {
          signerToCount[b.block.signerPublicKey].harvestCount += 1
          signerToCount[b.block.signerPublicKey].totalFee += Number(
            b.meta.totalFee
          )
        }
      }
      return signerToCount
    },
    harvesterPiChartData() {
      const q = Object.keys(this.signerToCount)
        .map((signerPublicKey) => {
          return [
            signerPublicKey,
            this.signerToCount[signerPublicKey].harvestCount
          ]
        })
        .sort((x, y) => {
          return y[1] - x[1]
        })
      return [['Signer', 'Count'], ...q]
    }
  }
}
</script>
