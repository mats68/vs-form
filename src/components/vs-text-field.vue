<template>
  <v-text-field :label="label" :id="item.id"></v-text-field>
</template>

<script>
import mixin from './vs-item-mixin'

export default {
  mixins: [mixin],
  mounted() {
    // console.log(this.schema, this.node)
  }
}
</script>

<style>

</style>
