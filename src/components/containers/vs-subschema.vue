<template>
  <vs-item :schema="item.schema" :designMode="designMode" node="root"></vs-item>
</template>

<script>
import mixin from 'src/components/vs-item-mixin'

export default {
  mixins: [mixin],
}
</script>

<style>

</style>
