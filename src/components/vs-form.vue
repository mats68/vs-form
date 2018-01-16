<template>
  <v-form>
    <vs-item :schema="internalSchema" :schemaManager="schemaManager" :designMode="designMode" :selection="selection" :node="node"></vs-item>
  </v-form>
</template>

<script>
// import {set} from 'lodash'
import { has } from 'lodash'

import { SchemaManager } from 'vs-schema'
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

    EventBus.$on('updateValue', (fieldPath, value) => {
      // debugger
      let obj = this.internalSchema.values
      const arr = fieldPath.split('.')
      let prop = arr[arr.length - 1]
      // debugger
      for (let ind = 0; ind < arr.length - 1; ind++) {
        const key = arr[ind]
        if (!has(obj, key)) {
          this.$set(obj, key, {})
        }
        obj = obj[key]
      }
      this.$set(obj, prop, value)
      // console.log(JSON.stringify(this.internalSchema.values))
      // console.log('updateValue', fieldPath, value)
      // console.log('values', JSON.stringify(this.internalSchema.values, null, 2))

      this.$emit('valueUpdated', this.internalSchema.values)
    })
  },
  updated() {
    // console.log('updated')
  }
}
</script>
