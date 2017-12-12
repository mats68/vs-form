<template>
    <v-text-field :label="item.label" id="item.id"></v-text-field>
</template>

<script>
export default {
  props: ['schema', 'startItem'],
  computed: {
    item() {
      return this.schema.components[this.startItem]
    },
  },
  mounted() {
    // console.log(this.schema, this.startItem)
  }

}
</script>

<style>

</style>
