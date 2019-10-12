<template>
    <div class="basic-container">
        <div class="container-content b-white m-24 p-v-24 p-h-32" v-for="(slot, index) in slots" :key="index">
            <slot :name="slot" v-if="!!slots.length"/>
        </div>
        <div class="container-content b-white m-24 p-v-24 p-h-32"  v-if="!slots.length">
            <slot/>
        </div>
    </div>
</template>

<script>
  export default {
    name: "baseContainerCard",
    props: {
      slots: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style lang="less" scoped>
    .basic-container{
        .container-content{
            border-radius: 2px;
        }
    }
</style>
