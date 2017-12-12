<template>
  <v-container fluid grid-list-md>
    <vs-item :schema="schema" :startItem="startItem" designMode></vs-item>
  </v-container>
</template>

<script>
import VsItem from './vs-item'

export default {
  props: {
    startItem: {
      type: String,
      default: 'form'
    },
    schema: {
      type: Object,
      required: true
    },
    designMode: Boolean
  },
  components: {
    VsItem
  }
}
</script>

<style>

</style>
