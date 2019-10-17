<template>
  <div>
    <div>AliasResolution</div>
    <pre>{{ JSON.stringify(receipt, null, '  ') }}</pre>
  </div>
</template>

<script>
export default {
  name: 'AliasResolution',
  props: {
    receipt: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
