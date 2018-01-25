<template>
  <vs-item v-bind="currentProperties(compo.schema, 'root')" v-on:updateValue="updateValue"></vs-item>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin],
  methods: {
    updateValue(fieldPath, value) {
      this.$emit('updateValue', fieldPath, value)
    },
  },
  created() {
    // debugger
  }
}
</script>

<style>

</style>
