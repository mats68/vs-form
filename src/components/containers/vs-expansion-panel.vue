<template>
  <v-expansion-panel>
    <slot></slot>
  </v-expansion-panel>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
