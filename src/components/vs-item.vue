<template>
  <div>
    <div v-if="!isContainer">
      <vs-text-field :label="item.label"></vs-text-field>
    </div>
    <div v-if="isContainer">
      <v-layout row wrap :tag="getTag">
        <v-flex v-for="field in itemList" :key="field.id" :class="colWidth">
          <vs-text-field :label="field.label"></vs-text-field>
          <!-- <vs-item :schema="schema" :startIem="field.id"></vs-item> -->
        </v-flex>
      </v-layout>
    </div>
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
      default: 'form'
    },
    schema: {
      type: Object,
      required: true
    },
    designMode: {
      type: Boolean,
      default: false
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
      return 'xl8'
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
