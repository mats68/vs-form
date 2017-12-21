<template>
  <v-form :style="schema.style" >
    <vs-item :schema="schema" :designMode="designMode" :node="node"></vs-item>
  </v-form>
</template>

<script>
import {updateSchemaIds} from 'vs-schema'

export default {
  props: {
    node: {
      type: String,
      default: 'root'
    },
    schema: {
      type: Object,
      required: true
    },
    designMode: {
      type: Boolean,
      default: false
    }
  },
  created() {
    updateSchemaIds(this.schema)
    // console.log('created vs-form')

    // console.log(formatJSON(this.schema))
  }
}
</script>

<style>

</style>
