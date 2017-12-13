export default {
  props: ['schema', 'node'],
  computed: {
    item() {
      return this.schema.components[this.node]
    },
    label() {
      return this.item ? this.item.label : ''
    },
    id() {
      return this.item ? this.item.id : ''
    }

  }
}
