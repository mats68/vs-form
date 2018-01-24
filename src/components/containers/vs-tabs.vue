<template>
  <v-tabs>
    <template v-for="component in panelList">
    <v-tab :key="'tab' + component.id">
      {{component.label}}
    </v-tab>
    <v-tab-item :key="'tabi' + component.id">
      <vs-item v-bind="currentProperties(schema,component.node)"></vs-item>
    </v-tab-item>
    </template>
  </v-tabs>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin],
}
</script>

<style>

</style>
