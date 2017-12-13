<template>
  <component v-if="designMode" :is="currentView(node)" v-bind="currentProperties(node)">
    <v-container v-if="isContainer" fluid grid-list-md>
      <draggable class="layout row wrap dragArea" v-model="itemList" :options="dragOptions" :move="onMove">
        <v-flex v-for="field in itemList" :class="colWidth(field)" :key="field.id">
          <vs-item v-bind="currentProperties(field.id)"></vs-item>
        </v-flex>
      </draggable>
    </v-container>
  </component>
  <component v-else :is="currentView(node)" v-bind="currentProperties(node)">
    <v-container v-if="isContainer" fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="field in itemList" :class="colWidth(field)" :key="field.id">
          <vs-item v-bind="currentProperties(field.id)"></vs-item>
        </v-flex>
      </v-layout>
    </v-container>
  </component>
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'

import VsTextField from './vs-text-field'
import VsContainer from './vs-container'
import VsCard from './vs-card'
import VsForm from './vs-form'
import VsPanel from './vs-panel'

export default {
  name: 'vs-item',
  data: function() {
    return {
      internalSchema: this.schema,
      views: {
        text: VsTextField,
        form: VsForm,
        card: VsCard,
        panel: VsPanel
      }
    }
  },
  props: {
    node: {
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
            let c = this.internalSchema.components[item]
            if (c && !c.hidden) {
              c.id = item
              resArray.push(c)
            }
          })
        }
        return resArray
      },
      set(value) {
        if (this.designMode && this.item) {
          const children = value.map(item => item.id)
          Vue.set(
            this.internalSchema.components[this.node],
            'children',
            children
          )
        }
      }
    },
    item() {
      return this.internalSchema.components[this.node]
    },
    isContainer() {
      return this.item && this.item.hasOwnProperty('children')
    },
    dragOptions() {
      return {
        group: 'normal',
        disabled: !this.designMode
      }
    },
    getDraggableTag() {
      return this.designMode ? 'draggable' : 'div'
    }
  },
  methods: {
    currentView(name) {
      return this.views[this.internalSchema.components[name].type]
    },
    currentProperties(name) {
      return {
        schema: this.schema,
        node: name,
        designMode: this.designMode,
        root: false
      }
    },
    colWidth(field) {
      return field && field.xl ? 'xl' + field.xl : 'xl2'
    },
    onMove({ relatedContext, draggedContext }) {
      console.log(relatedContext)
    },
    startDrag: function(evt) {
      console.log('startDrag', evt)
    },
    endDrag: function(evt) {
      console.log('endDrag', evt)
      // this.canDrag = null
      // this.targetElement = null
      // this.futureIndex = null
    }
  },

  components: {
    VsTextField,
    VsForm,
    VsCard,
    VsPanel,
    VsContainer,
    draggable
  },
  mounted() {
    // console.log(this.values.name)
  }
}
</script>

<style scoped>

.dragArea {
  min-height: 50px;
}

</style>
