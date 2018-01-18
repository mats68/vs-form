import {common} from 'vs-common'
import {fieldValidators} from 'vs-schema'

// import { EventBus } from './event-bus.js'

export default {
  props: ['schema', 'node', 'designMode', 'options', 'schemaManager', 'selection'],
  computed: {
    compo() {
      return this.schema.components[this.node]
    },
    editValue: {
      get() {
        if (this.schemaManager.schema && this.compo && this.compo.fieldPath) {
          return common.getObjValue(this.schemaManager.schema.values, this.compo.fieldPath)
        }
      },
      set(newValue) {
        if (this.compo && this.compo.fieldPath) {
          if (this.compo.onBeforeChange) {
            this.compo.onBeforeChange(newValue)
            // const b = this.compo.onBeforeChange.bind(this.schemaManager.schema)
            // b(newValue)
          }
          this.$emit('updateValue', this.compo.fieldPath, newValue)
          if (this.compo.onChanged) {
            this.compo.onChanged()
            // const b = this.compo.onChange.bind(this.schemaManager.schema)
            // b()
          }
        }
      }
    },
    validations() {
      let fns = []
      if (this.compo.validations) {
        if (this.compo.validations.required) {
          fns.push(fieldValidators.required(this.compo.label))
        }
        if (this.compo.validations.validate) {
          fns.push(this.compo.validations.validate)
        }
      }
      return fns
    },
    label() {
      return this.compo ? this.compo.label : ''
    },
    color() {
      return this.compo && this.compo.color ? this.compo.color : ''
    },
    id() {
      return this.compo ? this.compo.id : ''
    },
    style() {
      return this.compo ? this.compo.style : ''
    }
  }
}
