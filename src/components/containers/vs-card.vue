<template>
  <v-card :color="color" :style="style">
    <v-card-title>{{label}}</v-card-title>
    <slot></slot>
  </v-card>
</template>

<script>
import mixin from 'src/components/vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
