<template>
  <div class="container-fluid">
    <StorageCardList :storage="storage" />
    <div class="row no-gutters">
      <div class="col col-12 col-md-8">
        <div class="card m-3">
          <div class="card-body">
            <h5>
              Top Harvesters <small>(last {{ blocks.length }} blocks)</small>
            </h5>
            <TopHarvestersTable :blocks="blocks" :url="url" />
          </div>
        </div>
      </div>
      <div class="col col-12 col-md-4">
        <div class="card m-3 p-1">
          <HarvesterPiChart :blocks="blocks" />
        </div>
      </div>
    </div>
    <div class="row no-gutters">
      <div class="col col-12 col-md-6">
        <div class="card m-3">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5>
                Latest blocks
              </h5>
              <small>
                <nuxt-link to="/blocks/1">see more</nuxt-link>
              </small>
            </div>
            <LatestBlocksTable :blocks="blocks" :url="url" />
          </div>
        </div>
      </div>
      <div class="col col-12 col-md-6">
        <div class="card m-3">
          <div class="card-body">
            <h5>
              Latest transactions
            </h5>
            <LatestTransactionsTable :transactions="transactions" :url="url" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StorageCardList from '../components/StorageCardList'
import TopHarvestersTable from '../components/TopHarvestersTable'
import HarvesterPiChart from '../components/HarvesterPiChart'
import LatestBlocksTable from '../components/LatestBlocksTable'
import LatestTransactionsTable from '../components/LatestTransactionsTable'

export default {
  components: {
    LatestTransactionsTable,
    HarvesterPiChart,
    TopHarvestersTable,
    StorageCardList,
    LatestBlocksTable
  },
  data() {
    return {
      now: Date.now()
    }
  },
  computed: {
    ...mapGetters(['url', 'storage', 'blocks', 'transactions'])
  },
  mounted() {
    this.secondsInterval = setInterval(() => {
      this.now = Date.now()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.secondsInterval)
  }
}
</script>

<style scoped>
a {
  color: #35495e;
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}
</style>
