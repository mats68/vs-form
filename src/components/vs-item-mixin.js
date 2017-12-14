import Vue from 'vue'

export default {
  props: ['schema', 'node', 'designMode'],
  computed: {
    item() {
      return this.schema.components[this.node]
    },
    editValue: {
      get() {
        return this.schema.values[this.node]
      },
      set(newValue) {
        Vue.set(this.schema.values, this.node, newValue)
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
