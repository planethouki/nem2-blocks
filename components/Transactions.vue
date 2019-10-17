<template>
  <div>
    <h5>Transactions</h5>
    <template v-if="transactions.length > 0">
      <table>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Tx hash</th>
            <th>Max fee</th>
            <th>Deadline</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in transactions" :key="i" class="border-bottom">
            <td>
              <span class="text-truncate d-inline-block" style="width: 200px;">
                {{ t.transaction.signerPublicKey }}
              </span>
            </td>
            <td>
              <span class="text-truncate d-inline-block" style="width: 200px;">
                {{ t.meta.hash }}
              </span>
            </td>
            <td>{{ t.transaction.maxFee }}</td>
            <td>{{ t.transaction.deadline }}</td>
            <td>
              <component
                :is="typeToComponentName(t.transaction.type)"
                :transaction="t"
              ></component>
            </td>
          </tr>
        </tbody>
      </table>
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
