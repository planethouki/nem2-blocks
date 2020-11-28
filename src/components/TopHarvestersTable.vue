<template>
  <b-table
    show-empty
    striped
    hover
    small
    responsive
    :items="harvesterData"
    :fields="harvesterTableFields"
    :tbody-transition-props="transProps"
    class="mt-3"
  >
    <template v-slot:cell(fee)="data">
      <span>{{ $formatter.intPart(data.value) }}</span
      >.<span class="small">{{ $formatter.fracPart(data.value) }}</span>
    </template>
    <template v-slot:cell(signerPublicKey)="data">
      <a :href="`${url}/accounts/${data.value}`" target="_blank">{{
        data.value
      }}</a>
    </template>
    <template v-slot:empty="scope">
      <div class="text-center">
        <b-spinner type="grow" label="Spinning"></b-spinner>
      </div>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'TopHarvestersTable',
  props: {
    blocks: {
      type: Array,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      transProps: {
        name: 'block-list'
      },
      harvesterTableFields: [
        { key: 'rank', label: 'Rank', class: 'text-center' },
        {
          key: 'signerPublicKey',
          label: 'Harvester',
          tdClass: 'text-monospace small align-middle'
        },
        { key: 'count', label: 'Blocks' },
        { key: 'fee', label: 'Fees earned' }
      ]
    }
  },
  computed: {
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
    harvesterData() {
      return Object.keys(this.signerToCount)
        .map((key) => {
          return {
            signerPublicKey: key,
            count: this.signerToCount[key].harvestCount,
            fee: this.signerToCount[key].totalFee
          }
        })
        .sort((x, y) => {
          const a = x.count
          const b = y.count
          if (a < b) {
            return 1
          }
          if (a > b) {
            return -1
          }
          return 0
        })
        .map((d, index) => {
          return {
            rank: index + 1,
            ...d
          }
        })
    }
  }
}
</script>
