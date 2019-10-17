<template>
  <div>
    <div>Aggregate</div>
    <pre>{{ JSON.stringify(receipt, null, '  ') }}</pre>
  </div>
</template>

<script>
export default {
  name: 'Aggregate',
  props: {
    receipt: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
