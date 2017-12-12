<template>
  <v-container fluid grid-list-md>
    <v-layout :tag="getDraggableTag" v-model="itemList" :options="dragOptions">
      <slot></slot>
    </v-layout>

  </v-container>

</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: ['designMode', 'itemList'],
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.designMode,
        ghostClass: 'ghost'
      }
    },
    getDraggableTag() {
      return this.designMode ? 'draggable' : 'div'
    }
  },
  components: {
    draggable
  }
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
