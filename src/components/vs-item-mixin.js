import {common} from 'vs-common'
import {fieldValidators} from 'vs-schema'

// import { EventBus } from './event-bus.js'

export default {
  props: {
    node: {
      type: String,
      required: true
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
    },
    selection: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    compo() {
      return this.schema.components[this.node]
    },
    panelList() {
      return this.schema.components[this.node].panels.map(e => this.schema.components[e])
    },
    editValue: {
      get() {
        if (this.schemaManager.schema && this.compo && this.compo.fieldPath) {
          return common.getObjValue(this.schemaManager.schema.values, this.compo.fieldPath)
        }
      },
      set(newValue) {
        if (this.compo && this.compo.fieldPath) {
          if (this.compo.beforeChange) {
            this.compo.beforeChange(newValue)
          }
          this.$emit('updateValue', this.compo.fieldPath, newValue)
          if (this.compo.changed) {
            this.compo.changed()
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
  },
  methods: {
    updateValue(fieldPath, value) {
      this.$emit('updateValue', fieldPath, value)
    },
    currentProperties(schema, node) {
      return {
        schema,
        node,
        designMode: this.designMode,
        options: this.options,
        schemaManager: this.schemaManager,
        selection: this.selection
      }
    },
  }
}
