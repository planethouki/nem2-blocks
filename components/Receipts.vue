<template>
  <div>
    <h5>Block receipts</h5>
    <template v-if="receipts.transactionStatements !== undefined">
      <div v-for="(t, i) in receipts.transactionStatements" :key="i">
        <div v-for="(r, j) in t.statement.receipts" :key="j">
          <component :is="typeToComponentName(r.type)" :receipt="r"></component>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Receipts',
  data() {
    return {
      receipts: {}
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
      .$get(`${this.url}/block/${this.$route.params.height}/receipts`)
      .then((r) => {
        this.receipts = r
      })
  },
  methods: {
    typeToComponentName(type) {
      const basicType = this.$CatapultTypes.ReceiptTypeToBasicReceiptType(type)
      return this.$CatapultTypes.BasicReceiptFileNames[basicType]
    }
  }
}
</script>

<style scoped></style>
