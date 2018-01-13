<template>
  <vs-item :schema="compo.schema" :schemaManager="schemaManager" :designMode="designMode" node="root"></vs-item>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin],
}
</script>

<style>

</style>
