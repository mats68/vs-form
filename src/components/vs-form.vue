<template>
  <v-form>
    <vs-item :schema="internalSchema" :schemaManager="schemaManager" :designMode="designMode" :selection="selection" :node="node" v-on:updateValue="updateValue"></vs-item>
  </v-form>
</template>

<script>
// import {set} from 'lodash'
// import { has } from 'lodash'

import { SchemaManager } from 'vs-schema'
import { EventBus } from './event-bus.js'
import {common} from 'vs-common'

export default {
  data: () => ({
    schemaManager: {},
    internalSchema: {},
    selection: []
  }),
  methods: {
    updateValue(fieldPath, value) {
      common.updateObjValue(this.internalSchema.values, fieldPath, value)
      this.$emit('valueUpdated', fieldPath, value, this.internalSchema.values)
    }
  },
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
  },
  updated() {
    // console.log('updated')
  }
}
</script>
