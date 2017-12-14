<template>
  <v-card class="elevation-0">
    <v-card-title>{{item.label}}</v-card-title>
    <slot></slot>
  </v-card>
</template>

<script>
import mixin from 'src/components/vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style scoped>


</style>
