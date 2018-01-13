<template>
  <v-checkbox v-model="editValue" :label="label" :id="id"></v-checkbox>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
