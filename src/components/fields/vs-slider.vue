<template>
  <v-slider v-model="editValue" v-bind="fieldProperties" thumb-label v-on:updateValue="updateValue"></v-slider>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
