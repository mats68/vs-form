<template>
  <v-slider v-model="editValue" thumb-label :label="label" :id="id"></v-slider>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
