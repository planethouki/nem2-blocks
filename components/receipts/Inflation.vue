<template>
  <div>
    <div>Inflation</div>
    <pre>{{ JSON.stringify(receipt, null, '  ') }}</pre>
  </div>
</template>

<script>
export default {
  name: 'Inflation',
  props: {
    receipt: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
