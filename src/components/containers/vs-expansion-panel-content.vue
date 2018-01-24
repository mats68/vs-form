<template>
  <v-expansion-panel-content>
    <div slot="header">{{label}}</div>
      <v-card>
        <slot></slot>
      </v-card>
  </v-expansion-panel-content>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
