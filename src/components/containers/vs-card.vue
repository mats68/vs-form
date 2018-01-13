<template>
    <v-card :color="color">
      <v-card-title>{{label}}</v-card-title>
      <slot></slot>
    </v-card>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin],
}
</script>

<style scoped>

</style>


