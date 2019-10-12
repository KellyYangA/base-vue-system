<template>
    <baseContainerCard :slots="['slot1', 'slot2']">
        <div slot="slot1">插槽一</div>
        <div slot="slot2">插槽二</div>
    </baseContainerCard>
</template>

<script>
  export default {
    name: "homePage"
  }
</script>

<style scoped>

</style>
