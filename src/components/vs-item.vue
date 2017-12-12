<template>
  <component :is="currentView(startItem)" v-bind="currentProperties(startItem)">
    <vs-container v-if="isContainer" :itemList="itemList" :designMode="designMode">
      <v-flex v-for="field in itemList" :class="colWidth" :key="field.id">
        <vs-item v-bind="currentProperties(field.id)"></vs-item>
      </v-flex>
    </vs-container>
  </component>

  <!-- <div v-if="root">
    <vs-container :itemList="itemList" :designMode="designMode">
      <vs-item :schema="schema" :startItem="startItem" :designMode="designMode" :root="false"></vs-item>
    </vs-container>
  </div>
  <v-layout v-else-if="isContainer" :tag="getDraggableTag" v-model="itemList" :options="dragOptions">
    <v-flex v-for="field in itemList" :class="colWidth" :key="field.id">
      <vs-item :schema="schema" :startItem="field.id" :designMode="designMode" :root="false"></vs-item>
    </v-flex>
  </v-layout>
  <div v-else>
    <vs-text-field :label="item.label"></vs-text-field>
  </div> -->
</template>

<script>
import Vue from 'vue'

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
            this.internalSchema.components[this.startItem],
            'children',
            children
          )
        }
      }
    },
    item() {
      return this.internalSchema.components[this.startItem]
    },
    isContainer() {
      return this.item && this.item.hasOwnProperty('children')
    },
    colWidth() {
      return this.item && this.item.xl ? 'xl' + this.item.xl : 'xl12'
    },
  },
  methods: {
    currentView(name) {
      return this.views[this.internalSchema.components[name].type]
    },
    currentProperties(name) {
      return {
        schema: this.schema,
        startItem: name,
        designMode: this.designMode,
        root: false
      }
    }
  },

  components: {
    VsTextField,
    VsForm,
    VsCard,
    VsPanel,
    VsContainer,
  },
  mounted() {
    // console.log(this.values.name)
  }
}
</script>

