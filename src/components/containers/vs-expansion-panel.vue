<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="component in itemList" :key="component.id">
      <div slot="header">{{component.label}}</div>
      <vs-item v-bind="currentProperties(schema,component.node)"></vs-item>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin],
  computed: {
    itemList() {
      return this.schema.components[this.node].panels.map(e => this.schema.components[e])
    }
  },
}
</script>

<style>

</style>
