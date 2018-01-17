<template>
  <v-text-field v-model="editValue" :label="label" :id="id" :rules="validations"></v-text-field>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
