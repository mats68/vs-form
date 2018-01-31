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
        return this.schemaManager.getSchemaValue(this.compo)
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
          this.$emit('updateValue', this.compo, newValue)
          if (this.compo.changed) { // auf schema definiert
            this.compo.changed()
          }
          this.changed() // auf component-level definiert
        }
      }
    },
    validations() {
      let fns = []
      if (this.compo.data && this.compo.data.validations) {
        if (this.compo.data.validations.required) {
          fns.push(fieldValidators.required(this.compo.label))
        }
        if (this.compo.data.validations.validate) {
          fns.push(this.compo.data.validations.validate)
        }
      }
      return fns
    },
    label() {
      return this.compo ? this.compo.label : ''
    },
    hint() {
      return this.compo.hint ? this.compo.hint : ''
    },
    placeholder() {
      return this.compo && this.compo.placeholder ? this.compo.placeholder : ''
    },
    disabled() {
      if ((this.compo && this.compo.disabled === true) || this.designMode) {
        return true
      } else {
        return false
      }
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
    hideDetails() {
      return !((this.compo.data && this.compo.data.validations) || (this.hint))
    },
    fieldProperties() {
      const {label, hint, placeholder, id, items, disabled, hideDetails} = this
      return Object.assign({}, this.compo.fieldProps, {label, hint, persistentHint: true, placeholder, id, items, rules: this.validations, required: this.validations.length > 0, disabled, hideDetails})
    }
  },
  methods: {
    beforeChange(field) {
      // nothing
    },
    changed(field) {
      // nothing
    },
    updateValue(compo, value) {
      this.$emit('updateValue', compo, value)
    },
    currentProperties(schema, node) {
      const props = schema.components[node] && schema.components[node].props ? schema.components[node].props : null
      const {designMode, schemaManager} = this
      return Object.assign({}, props, {schema, node, designMode, schemaManager})
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
