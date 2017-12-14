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

// import { components } from 'src/utils/constants'

// Containers
import VsCard from 'src/components/containers/vs-card'
import VsPanel from 'src/components/containers/vs-panel'
import VsSubschema from 'src/components/containers/vs-subschema'

// Fields
import VsTextField from 'src/components/fields/vs-text-field'
import VsSlider from 'src/components/fields/vs-slider'
import VsCheckbox from 'src/components/fields/vs-checkbox'

export default {
  name: 'vs-item',
  data: function() {
    return {
      internalSchema: this.schema,
      views: {
        card: VsCard,
        panel: VsPanel,
        subschema: VsSubschema,
        text: VsTextField,
        checkbox: VsCheckbox,
        slider: VsSlider,
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
        group: this.internalSchema.id,
        disabled: !this.designMode
      }
    },
  },
  methods: {
    currentView(name) {
      return this.views[this.internalSchema.components[name].type]
    },
    currentProperties(name) {
      return {
        schema: this.internalSchema,
        node: name,
        designMode: this.designMode,
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
