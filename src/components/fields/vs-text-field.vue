<template>
  <v-text-field v-model="editValue" v-bind="fieldProperties"></v-text-field>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
