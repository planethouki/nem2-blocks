<template>
  <div class="container-fluid"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['blockHeight'])
  },
  mounted() {
    this.$router.push(`/blocks/${Math.ceil(this.blockHeight / 100)}`)
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
