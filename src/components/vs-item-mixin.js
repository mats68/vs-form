import Vue from 'vue'

export default {
  props: ['schema', 'node', 'designMode', 'options', 'schemaManager', 'selection'],
  computed: {
    compo() {
      return this.schema.components[this.node]
    },
    editValue: {
      get() {
        if (this.compo && this.compo.field) {
          return this.schema.values[this.compo.field]
        }
      },
      set(newValue) {
        if (this.compo && this.compo.field) {
          Vue.set(this.schema.values, this.compo.field, newValue)
        }
      }
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
