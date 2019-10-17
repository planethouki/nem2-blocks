<template>
  <div>
    <div>BalanceCredit</div>
    <pre>{{ JSON.stringify(receipt, null, '  ') }}</pre>
  </div>
</template>

<script>
export default {
  name: 'BalanceCredit',
  props: {
    receipt: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
