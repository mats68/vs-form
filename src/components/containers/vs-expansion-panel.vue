<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="component in getChildrenList" :key="component.id">
      <div slot="header">{{component.label}}</div>
      <vs-item v-bind="currentProperties(schema,component.node)"></vs-item>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin],
}
</script>

<style>

</style>
