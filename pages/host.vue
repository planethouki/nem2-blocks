<template>
  <div></div>
</template>

<script>
export default {
  name: 'Host',
  mounted() {
    this.exec()
  },
  methods: {
    async exec() {
      const infoHostChange = this.$store.state.infoHostChange
      const host = infoHostChange.host
      const redirectPath = infoHostChange.redirectPath
      if (host === null) {
        this.$router.push('/')
        return
      }
      this.$store.dispatch('setHost', { host })
      this.$store.dispatch('deleteInfoHostChange')
      this.$store.dispatch('deleteNewBlock')
      this.$store.dispatch('deleteStorage')
      const storage = await this.$axios.$get(
        `${this.$store.getters.url}/diagnostic/storage`
      )
      this.$store.dispatch('setStorage', { storage })
      this.$router.push(redirectPath)
    }
  }
}
</script>

<style scoped></style>
