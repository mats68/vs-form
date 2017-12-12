<template>
  <div v-if="root">
    <v-container fluid grid-list-md>
      <vs-item :schema="schema" :startItem="startItem" :designMode="designMode" :root="false"></vs-item>
    </v-container>
  </div>
  <v-layout v-else-if="isContainer" :tag="getTag" row wrap>
    <v-flex v-for="field in itemList" :class="colWidth" :key="field.id">
      <vs-item :schema="schema" :startItem="field.id" :root="false"></vs-item>
    </v-flex>
  </v-layout>
  <div v-else>
    <vs-text-field :label="item.label"></vs-text-field>
  </div>
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'

import VsTextField from './vs-text-field'

export default {
  name: 'vs-item',
  data: function() {
    return {
      internalSchema: this.schema
    }
  },
  props: {
    startItem: {
      type: String,
      default: 'root'
    },
    schema: {
      type: Object,
      required: true
    },
    designMode: {
      type: Boolean,
      default: false
    },
    root: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    itemList: {
      get() {
        let resArray = []
        if (this.item && !this.item.hidden) {
          this.item.children.forEach(item => {
            let c = this.schema.components[item]
            if (c && !c.hidden) {
              c.id = item
              resArray.push(c)
            }
          })
        }
        console.log(resArray)
        return resArray
      },
      set(value) {
        if (this.designMode && this.item) {
          Vue.set(this.item, 'children', value.children)
        }
      }
    },
    item() {
      return this.schema.components[this.startItem]
    },
    isContainer() {
      return this.item && this.item.hasOwnProperty('children')
    },
    colWidth() {
      return 'xl'
    },
    getTag() {
      return this.designMode ? 'draggable' : 'div'
    }
  },
  methods: {},

  components: {
    VsTextField,
    draggable
  },
  mounted() {
    // console.log(this.values.name)
  }
}
</script>

<style>

</style>
