<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap :tag="getDraggableTag" v-model="list" :options="dragOptions">
      <slot></slot>
    </v-layout>

  </v-container>

</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: ['designMode', 'itemList'],
  data: function () {
    return {
      list: this.itemList
    }
  },
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
