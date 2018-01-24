<template>
  <v-select v-model="editValue" :label="label" :id="id" :items="items" :rules="validations"></v-select>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
