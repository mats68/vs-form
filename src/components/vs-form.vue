<template>
  <v-form>
    <vs-item :schema="internalSchema" :schemaManager="schemaManager" :designMode="designMode" :selection="selection" :node="node"></vs-item>
  </v-form>
</template>

<script>
import {SchemaManager} from 'vs-schema'
import { EventBus } from './event-bus.js'

export default {
  data: () => ({
    schemaManager: {},
    internalSchema: {},
    selection: []
  }),
  props: {
    node: {
      type: String,
      default: 'root'
    },
    schema: {
      type: Object,
      required: true
    },
    listSchemas: {
      type: Object
    },
    designMode: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.schemaManager = SchemaManager(this.schema, this.listSchemas)
    this.internalSchema = this.schemaManager.schema

    EventBus.$on('changeSelection', (id, multiselect) => {
      this.schemaManager.changeSelection(id, multiselect)
      this.selection = this.schemaManager.selection
      this.$emit('selectionChanged', this.selection)
    })
  }
}
</script>
