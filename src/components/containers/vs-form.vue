<template>
  <v-form>
    <slot></slot>
  </v-form>
</template>

<script>
import mixin from 'src/components/vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
