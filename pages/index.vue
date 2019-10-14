<template>
  <div class="container-fluid">
    <div class="row">
      <div
        v-for="data in topCardList"
        :key="data.key"
        class="col col-12 col-sm-6 col-md-4"
      >
        <div class="card m-3">
          <div class="card-body d-flex justify-content-between">
            <font-awesome-icon :icon="data.icon" style="font-size: 50px;" />
            <div class="text-right">
              <div class="text-muted">{{ data.title }}</div>
              <div class="h4">{{ data.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      storage: {}
    }
  },
  computed: {
    ...mapGetters(['url', 'ws', 'currentHeight']),
    topCardList() {
      if (!this.storage.numBlocks) {
        return []
      }
      return [
        {
          key: 'height',
          title: 'Height',
          value: this.storage.numBlocks,
          icon: 'cube'
        },
        {
          key: 'transactions',
          title: 'Transactions',
          value: this.storage.numTransactions,
          icon: 'scroll'
        },
        {
          key: 'accounts',
          title: 'Accounts',
          value: this.storage.numAccounts,
          icon: 'user'
        }
      ]
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'host') {
        this.get()
      } else if (mutation.type === 'newBlock') {
        this.get()
      }
    })
    this.get()
  },
  methods: {
    get() {
      this.$axios.$get(`${this.url}/diagnostic/storage`).then((res) => {
        this.storage = res
      })
    }
  }
}
</script>

<style></style>
