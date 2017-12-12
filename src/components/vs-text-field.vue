<template>
    <v-text-field :label="item.label" id="item.id"></v-text-field>
</template>

<script>
export default {
  props: ['schema', 'node'],
  computed: {
    item() {
      return this.schema.components[this.node]
    },
  },
  mounted() {
    // console.log(this.schema, this.node)
  }

}
</script>

<style>

</style>
