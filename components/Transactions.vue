<template>
  <div>
    <h5>Transactions</h5>
    <template v-if="transactions.length > 0">
      <div v-for="(t, i) in transactions" :key="i">
        <component
          :is="typeToComponentName(t.transaction.type)"
          :transaction="t"
        ></component>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Transactions',
  components: {},
  data() {
    return {
      transactions: []
    }
  },
  computed: {
    ...mapGetters(['url']),
    height() {
      return this.$route.params.height
    }
  },
  mounted() {
    this.$axios
      .$get(
        `${this.url}/block/${this.$route.params.height}/transactions?pageSize=100`
      )
      .then((t) => {
        this.transactions = t
      })
  },
  methods: {
    typeToComponentName(type) {
      const name = this.$CatapultTypes.TxDirectoryNames[type]
      return name.charAt(0).toUpperCase() + name.slice(1) + 'Short'
    }
  }
}
</script>

<style scoped></style>
