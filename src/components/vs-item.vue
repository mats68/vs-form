<template>
  <v-flex xs8>
    <vs-text-field></vs-text-field>
  </v-flex>

</template>

<script>
// import draggable from 'vuedraggable'
import VsTextField from './vs-text-field'

export default {
  name: 'vs-item',
  props: {
    startItem: {
      type: String,
      default: 'form'
    },
    schema: {
      type: Object,
      required: true
    }
  },
  components: {
    VsTextField
  }
}
</script>

<style>

</style>
