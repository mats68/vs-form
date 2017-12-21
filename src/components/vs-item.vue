<template>
  <component v-if="designMode" :is="currentView(node)" v-bind="currentProperties(node)">
    <v-container v-if="isContainer" fluid grid-list-md>
      <draggable class="layout row wrap dragArea" v-model="itemList" :options="dragOptions">
        <v-flex v-for="component in itemList" :class="colWidth(component)" :key="component.id">
          <vs-item v-bind="currentProperties(component.id)"></vs-item>
        </v-flex>
      </draggable>
    </v-container>
  </component>
  <component v-else :is="currentView(node)" v-bind="currentProperties(node)">
    <v-container v-if="isContainer" fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="component in itemList" :class="colWidth(component)" :key="component.id">
          <vs-item v-bind="currentProperties(component.id)"></vs-item>
        </v-flex>
      </v-layout>
    </v-container>
  </component>
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
import { isArray } from 'lodash'

import { components, getChildrenComponents } from 'vs-schema'

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
        // let resArray = []
        // if (this.compo && !this.compo.hidden) {
        //   this.compo.children.forEach(compo => {
        //     let c = this.internalSchema.components[compo]
        //     if (c && !c.hidden) {
        //       c.id = compo
        //       resArray.push(c)
        //     }
        //   })
        // }
        // return resArray
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
    colWidth(component) {
      return component && component.xl ? 'xl' + component.xl : 'xl2'
    }
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
