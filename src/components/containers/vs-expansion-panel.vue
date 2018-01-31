<template>
  <v-expansion-panel v-bind="fieldProperties">
    <v-expansion-panel-content v-for="component in getChildrenList" :key="component.id" :value="component.id === compo.activeTab">
      <div slot="header" @click="tabOpen(component.id)">{{component.label}}</div>
      <vs-item v-bind="currentProperties(schema,component.node)" v-on:updateValue="updateValue"></vs-item>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin],
  computed: {
  },
  methods: {
    tabOpen(id) {
      this.compo.activeTab = id
      // alert(id)
    }
  }
}
</script>

<style>

</style>
