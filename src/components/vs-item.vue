<template>
  <component v-if="designMode" :is="currentView(node)" v-bind="currentProperties(node)">
    <v-container v-if="isContainer" fluid grid-list-md>
      <draggable class="layout row wrap dragArea" v-model="itemList" :options="dragOptions">
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
import { isArray } from 'lodash'

// import { components } from 'src/utils/constants'

// Containers
import VsCard from 'src/components/containers/vs-card'
import VsPanel from 'src/components/containers/vs-panel'
import VsSubschema from 'src/components/containers/vs-subschema'

// Fields
import VsTable from 'src/components/fields/vs-table'
import VsTextField from 'src/components/fields/vs-text-field'
import VsSlider from 'src/components/fields/vs-slider'
import VsCheckbox from 'src/components/fields/vs-checkbox'

export default {
  name: 'vs-item',
  data: function() {
    return {
      views: {
        card: VsCard,
        panel: VsPanel,
        subschema: VsSubschema,
        table: VsTable,
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
        return resArray
      },
      set(value) {
        if (this.designMode && this.item) {
          const children = value.map(item => item.id)
          Vue.set(
            this.schema.components[this.node],
            'children',
            children
          )
        }
      }
    },
    item() {
      return this.schema.components[this.node]
    },
    isContainer() {
      return this.item && this.item.hasOwnProperty('children')
    },
    dragOptions() {
      return {
        group: this.schema.id,
        disabled: !this.designMode
      }
    }
  },
  methods: {
    currentView(name) {
      if (
        isArray(this.item.type) ||
        isArray(this.schema.values[this.item.field])
      ) {
        return VsTable
      } else {
        return this.views[this.item.type]
      }
    },
    currentProperties(name) {
      return {
        schema: this.schema,
        node: name,
        designMode: this.designMode
      }
    },
    colWidth(field) {
      return field && field.xl ? 'xl' + field.xl : 'xl2'
    }
  },

  components: {
    draggable,
    VsCard,
    VsPanel,
    VsSubschema,
    VsTable,
    VsTextField,
    VsSlider,
    VsCheckbox
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
