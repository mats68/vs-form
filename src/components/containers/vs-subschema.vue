<template>
  <vs-item :schema="item.schema" :designMode="designMode"></vs-item>
</template>

<script>
import mixin from 'src/components/vs-item-mixin'

export default {
  mixins: [mixin]
}
</script>

<style>

</style>
