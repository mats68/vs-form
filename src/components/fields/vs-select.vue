<template>
  <v-select v-model="editValue" v-bind="fieldProperties"></v-select>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
