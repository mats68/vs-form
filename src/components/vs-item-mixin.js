import Vue from 'vue'

export default {
  props: ['schema', 'node', 'designMode'],
  computed: {
    item() {
      return this.schema.components[this.node]
    },
    editValue: {
      get() {
        if (this.item) {
          return this.schema.values[this.item.field]
        }
      },
      set(newValue) {
        if (this.item) {
          Vue.set(this.schema.values, this.item.field, newValue)
        }
      }
    },
    label() {
      return this.item ? this.item.label : ''
    },
    id() {
      return this.item ? this.item.id : ''
    }
  }
}
