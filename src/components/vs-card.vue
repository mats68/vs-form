<template>
  <v-card>
    <v-card-title>{{item.label}}</v-card-title>
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  props: ['schema', 'node'],
  computed: {
    item() {
      return this.schema.components[this.node]
    }
  }
}
</script>

<style>

</style>
