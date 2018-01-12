<template>
  <v-form>
    <vs-item :schema="schema" :schemaManager="schemaManager" :designMode="designMode" :node="node"></vs-item>
  </v-form>
</template>

<script>

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
    schemaManager: {
      type: Object,
      required: true
    },
    designMode: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // updateSchemaIds(this.schema)
    // console.log('created vs-form')

    // console.log(formatJSON(this.schema))
  }
}
</script>

