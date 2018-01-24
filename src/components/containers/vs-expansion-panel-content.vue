<template>
  <v-card>
    <slot></slot>
  </v-card>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
