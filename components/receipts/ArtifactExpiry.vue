<template>
  <div>
    <div>ArtifactExpiry</div>
    <pre>{{ JSON.stringify(receipt, null, '  ') }}</pre>
  </div>
</template>

<script>
export default {
  name: 'ArtifactExpiry',
  props: {
    receipt: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
