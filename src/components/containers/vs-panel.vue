<template>
  <div>
    <p>{{label}}</p>
    <slot></slot>
  </div>
</template>

<script>
import mixin from 'src/components/vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
