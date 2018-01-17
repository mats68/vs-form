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
import {cloneDeep} from 'lodash'

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
    },
    // submit() {
    //   alert('submit')
    // }
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
    if (this.schemaManager.errors > 0) {
      console.log('Schema-Errors', this.schema.name, this.schemaManager.errors)
    }
    this.internalSchema = this.schemaManager.schema
    //to make values reactive
    this.internalSchema.values = cloneDeep(this.internalSchema.values)
    if (this.schema.name === 'schemaNewComponent')
    console.log('Schema-Values', this.schema.name, JSON.stringify(this.schemaManager.schema.values))

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
