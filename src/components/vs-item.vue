<template>
  <component :is="currentView(node)" v-bind="currentProperties(node)">
    <component v-if="isContainer" :is="isDraggable" class="grid-container grid-row" :class="isDraggableClass" :options="dragOptions" v-model="itemList">
      <div v-for="component in itemList" :class="colAndRowSize(component)" :key="component.id">
        <vs-item v-bind="currentProperties(component.node)"></vs-item>
      </div>
    </component>
  </component>

  <!-- <component v-if="designMode" :is="currentView(node)" v-bind="currentProperties(node)">
    <v-container v-if="isContainer" fluid grid-list-md>
      <draggable class="layout row wrap dragArea" v-model="itemList" :options="dragOptions">
        <v-flex v-for="component in itemList" :class="colAndRowSize(component)" :key="component.id">
          <vs-item v-bind="currentProperties(component.node)"></vs-item>
        </v-flex>
      </draggable>
    </v-container>
  </component>
  <component v-else :is="currentView(node)" v-bind="currentProperties(node)">
    <v-container v-if="isContainer" fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="component in itemList" :class="colAndRowSize(component)" :key="component.id">
          <vs-item v-bind="currentProperties(component.node)"></vs-item>
        </v-flex>
      </v-layout>
    </v-container>
  </component> -->
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
import { isArray } from 'lodash'

import { components, getChildrenComponents, updateSchemaIds } from 'vs-schema'

// Containers
import VsCard from 'src/components/containers/vs-card'
import VsPanel from 'src/components/containers/vs-panel'
import VsSubschema from 'src/components/containers/vs-subschema'

// Fields
import VsTableSingleEditor from 'src/components/fields/vs-table-single-editor'
import VsTextField from 'src/components/fields/vs-text-field'
import VsSlider from 'src/components/fields/vs-slider'
import VsCheckbox from 'src/components/fields/vs-checkbox'

export default {
  name: 'vs-item',
  data: function() {
    return {
      internalSchema: this.schema, // nötig sonst geht drag drop nicht
      views: {
        card: VsCard,
        panel: VsPanel,
        subschema: VsSubschema,
        text: VsTextField,
        checkbox: VsCheckbox,
        slider: VsSlider
      }
    }
  },
  props: {
    node: {
      type: String,
      required: true
    },
    schema: {
      type: Object,
      required: true
    },
    designMode: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    compo() {
      return this.internalSchema.components[this.node]
    },
    itemList: {
      get() {
        return getChildrenComponents(this.internalSchema, this.node)
      },
      set(value) {
        if (this.designMode && this.compo) {
          const children = value.map(compo => compo.id)
          Vue.set(
            this.internalSchema.components[this.node],
            'children',
            children
          )
        }
      }
    },
    isContainer() {
      return this.compo && this.compo.hasOwnProperty('children')
    },
    isDraggable() {
      return this.designMode ? 'draggable' : 'div'
    },
    isDraggableClass() {
      return this.designMode ? 'dragArea' : ''
    },
    dragOptions() {
      return {
        group: this.internalSchema.id,
        disabled: !this.designMode
      }
    }
  },
  methods: {
    currentView(name) {
      if (
        this.compo &&
        this.compo.field &&
        isArray(this.internalSchema.values[this.compo.field]) &&
        this.compo.type === components.text // array NUR Text-Felder erlaubt
      ) {
        return VsTableSingleEditor
      } else {
        return this.views[this.compo.type]
      }
    },
    currentProperties(name) {
      return {
        schema: this.internalSchema,
        node: name,
        designMode: this.designMode,
        options: this.options
      }
    },
    colAndRowSize(component) {
      // todo write test
      if (!component) {
        return
      }
      const s = ['xs', 'sm', 'md', 'lg', 'xl']
      let res = s.reduce((prevVal, currVal, idx) => {
        if (component[currVal]) {
          let cur = currVal + '-' + component[currVal]
          return prevVal === '' ? cur : prevVal + ' ' + cur
        } else {
          return prevVal
        }
      }, '')
      // always provide xs
      if (!component.xs) {
        res = res + ' xs-12'
      }
      if (component.rows) {
        res = res + ' rows-' + component.rows
      }

      return res
    }
  },
  created() {
    updateSchemaIds(this.internalSchema)
  },
  components: {
    draggable,
    VsCard,
    VsPanel,
    VsSubschema,
    VsTableSingleEditor,
    VsTextField,
    VsSlider,
    VsCheckbox
  },
  mounted() {
    // console.log('components', components)
  }
}
</script>

<style scoped>
.dragArea {
  min-height: 50px;
}
</style>


