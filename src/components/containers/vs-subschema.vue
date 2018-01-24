<template>
  <vs-item v-bind="currentProperties(compo.schema, 'root')" v-on:updateValue="updateValue"></vs-item>
  <!-- <vs-item :schema="compo.schema" :schemaManager="schemaManager" :designMode="designMode" :selection="selection" node="root" v-on:updateValue="updateValue"></vs-item> -->
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
