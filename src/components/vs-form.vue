<template>
  <v-form ref="form">
    <vs-item :schema="internalSchema" :schemaManager="schemaManager" :designMode="designMode" :node="node" v-on:updateValue="updateValue"></vs-item>
  </v-form>
</template>

<script>
// import {common} from 'vs-common'
import { has, cloneDeep } from 'lodash'

export default {
  data: () => ({
    internalSchema: {}
  }),
  methods: {
    updateValue(compo, value) {
      this.schemaManager.updateSchemaValue(compo, value)
      // common.updateObjValue(this.internalSchema.values, fieldPath, value)
      this.$emit('valueUpdated', compo, value, this.internalSchema.values)
    },
    validate() {
      let valOk = true
      valOk = this.$refs.form.validate()
      if (valOk === false) return false
      // hack da validate nicht
      let ar = { ar: [] }
      const fn = vm => ar.ar.push(vm)
      this.processChildVMs(this.$refs.form, fn)
      ar.ar.forEach(a => {
        if (has(a, 'errors') && a.errors.length > 0) {
          valOk = false
        }
      })
      return valOk
    },
    getComponentById(id) {
      let ar = { comp: null }
      const fn = vm => {if (vm.id === id) {ar.comp = vm}}
      this.processChildVMs(this.$refs.form, fn)
      return ar.comp
    },
    reset() {
      // reset values and errors
      this.schemaManager.resetSchemaValues()
      this.$refs.form.reset()
    },
    processChildVMs(vm, fn) {
      vm.$children.forEach(cvm => {
        fn(cvm)
        this.processChildVMs(cvm, fn)
      })
    }
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
