<template>
  <div>
    <div class="body-2">{{label}}</div>
    <slot></slot>
  </div>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
