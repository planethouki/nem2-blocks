<template>
  <div>
    <pre>{{ JSON.stringify(receipt, null, '  ') }}</pre>
    <div>Other</div>
  </div>
</template>

<script>
export default {
  name: 'Other',
  props: {
    receipt: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
