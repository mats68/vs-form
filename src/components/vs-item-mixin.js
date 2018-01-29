import {common} from 'vs-common'
import {fieldValidators} from 'vs-schema'

export default {
  computed: {
    compo() {
      return this.schema.components[this.node]
    },
    getChildrenList() {
      return this.schemaManager.getChildrenComponents(this.schema, this.node)
    },
    editValue: {
      get() {
        if (this.schemaManager.schema && this.compo && this.compo.fieldPath) {
          return common.getObjValue(this.schemaManager.schema.values, this.compo.fieldPath)
        }
      },
      set(newValue) {
        if (this.compo && this.compo.fieldPath) {
          const field = {value: newValue, changed: false}
          this.beforeChange(field) // auf component-level definiert
          if (field.changed) {
            newValue = field.value
          }
          if (this.compo.beforeChange) { // auf schema definiert
            this.compo.beforeChange(newValue)
          }
          this.$emit('updateValue', this.compo.fieldPath, newValue)
          if (this.compo.changed) {
            this.compo.changed()
          }
          this.changed() // auf component-level definiert
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
    placeholder() {
      return this.compo && this.compo.placeholder ? this.compo.placeholder : ''
    },
    disabled() {
      return this.compo && this.compo.disabled ? this.compo.disabled : false
    },
    color() {
      return this.compo && this.compo.color ? this.compo.color : ''
    },
    id() {
      return this.compo ? this.compo.id : ''
    },
    items() {
      return this.compo && this.compo.data && this.compo.data.items ? this.compo.data.items : ''
    },
    style() {
      return this.compo ? this.compo.style : ''
    },
    fieldProperties() {
      return {
        label: this.label,
        id: this.id,
        items: this.items,
        rules: this.validations,
        disabled: this.disabled,
        placeholder: this.placeholder
      }
    }
  },
  methods: {
    beforeChange(field) {
      // nothing
    },
    changed(field) {
      // nothing
    },
    updateValue(fieldPath, value) {
      this.$emit('updateValue', fieldPath, value)
    },
    currentProperties(schema, node) {
      const props = schema.components[node] && schema.components[node].props ? schema.components[node].props : null
      return {
        schema,
        node,
        designMode: this.designMode,
        ...props,
        schemaManager: this.schemaManager,
      }
    },
  },
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
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
}
