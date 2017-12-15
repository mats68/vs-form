<template>
  <v-form :style="schema.style">
    <vs-item :schema="schema" :designMode="designMode" :node="node"></vs-item>
  </v-form>
</template>

<script>
import {updateSchemaId} from 'src/utils/utils'

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
    updateSchemaId(this.schema, 'main')
    // console.log(formatJSON(this.schema))
  }
}
</script>

<style>

</style>
