<template>
  <v-checkbox v-model="editValue" v-bind="fieldProperties"></v-checkbox>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
