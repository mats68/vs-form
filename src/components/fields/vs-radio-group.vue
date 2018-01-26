<template>
  <v-radio-group v-model="editValue" v-bind="fieldProperties">
  <!-- <v-radio-group v-model="editValue" :label="label" :id="id" :rules="validations"> -->
    <v-radio v-for="item in items" :key="item.value" :label="item.text" :value="item.value"></v-radio>
  </v-radio-group>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
