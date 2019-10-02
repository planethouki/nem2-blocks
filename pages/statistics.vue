<template>
  <div class="container">
    <div
      v-for="(value, key) in storage"
      :key="key"
      class="d-flex justify-content-between"
      style="max-width: 300px;"
    >
      <span>{{ key }}</span>
      <span>{{ value }}</span>
    </div>
    <GChart
      v-if="blocks.length > 0"
      :settings="{ packages: ['corechart'] }"
      type="LineChart"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GChart } from 'vue-google-charts'

export default {
  components: { GChart },
  data() {
    return {
      chartOptions: {
        title: 'Block time differences (last 241 blocks)',
        width: 900,
        height: 400
      },
      blocks: [],
      storage: {}
    }
  },
  computed: {
    ...mapGetters(['url', 'ws', 'currentHeight']),
    chartData() {
      const q = this.blocks
        .map((b) => {
          return {
            timestamp: Number(b.block.timestamp),
            height: b.block.height
          }
        })
        .sort((x, y) => {
          const a = x.height
          const b = y.height
          if (a < b) {
            return -1
          }
          if (a > b) {
            return 1
          }
          return 0
        })
        .map((b, idx, org) => {
          if (idx === 0) {
            return [b.height, 0, 0]
          } else if (idx < 61) {
            return [b.height, b.timestamp - org[idx - 1].timestamp, 0]
          }
          return [
            b.height,
            b.timestamp - org[idx - 1].timestamp,
            (b.timestamp - org[idx - 60].timestamp) / 60
          ]
        })
        .slice(1)
      return [
        [
          'Height',
          'Time Difference (in ms)',
          'Avg Time Difference (per 60 blocks)'
        ],
        ...q
      ]
    }
  },
  mounted() {
    this.$axios.$get(`${this.url}/diagnostic/storage`).then((res) => {
      this.storage = res
    })
    this.$axios
      .$get(`${this.url}/chain/height`)
      .then((res) => {
        this.$store.dispatch('setCurrentHeight', { currentHeight: res.height })
        const q = Math.max(Number(res.height) - 241, 1)
        return this.$axios.$get(`${this.url}/diagnostic/blocks/${q}/limit/241`)
      })
      .then((res) => {
        this.blocks = res
      })
  },
  destroyed() {},
  methods: {}
}
</script>

<style></style>
