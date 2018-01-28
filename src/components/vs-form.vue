<template>
  <v-form ref="form">
    <vs-item :schema="internalSchema" :schemaManager="schemaManager" :designMode="designMode" :node="node" v-on:updateValue="updateValue"></vs-item>
  </v-form>
</template>

<script>

import { resetSchemaValues } from 'vs-schema'
import {common} from 'vs-common'
import {cloneDeep} from 'lodash'

export default {
  data: () => ({
    internalSchema: {},
  }),
  methods: {
    updateValue(fieldPath, value) {
      common.updateObjValue(this.internalSchema.values, fieldPath, value)
      this.$emit('valueUpdated', fieldPath, value, this.internalSchema.values)
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      // reset values and errors
      resetSchemaValues(this.internalSchema)
      this.$refs.form.reset()
    },
  },
  props: {
    node: {
      type: String,
      default: 'root'
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
    // this.schemaManager = new SchemaManager(this.schema, this.listSchemas)
    // if (this.schemaManager.errors > 0) {
    //   console.error('Schema-Errors', this.schema.name, this.schemaManager.errors)
    // }
    if (this.schemaManager.errors.length > 0) {
      console.error(`errors in schema: "${this.schemaManager.schema.name}"`)
      console.log(this.schemaManager.printErrors())
    }
    this.internalSchema = this.schemaManager.schema
    // to make values reactive
    this.internalSchema.values = cloneDeep(this.internalSchema.values)
  },
  updated() {
    // console.log('updated')
  }
}
</script>

<style>
</style>
