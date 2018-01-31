<template>
  <div @click.stop="changeSelection($event)">
    <div v-if="designMode" :class="{focused: isFocused, selected: isSelected}"></div>
    <v-tooltip bottom :disabled="tooltipDisabled">
      <component :is="currentView(node)" v-bind="currentProperties(internalSchema,node)" v-on:updateValue="updateValue" slot="activator">
        <component v-if="isContainer" :is="isDraggable" :class="getContainerStyle" :style="gridStyle" :options="dragOptions" v-model="itemList">
          <div v-for="component in itemList" :class="colAndRowSize(component)" :key="component.id">
            <vs-item v-bind="currentProperties(internalSchema,component.node)" v-on:updateValue="updateValue"></vs-item>
          </div>
        </component>
      </component>
      <span>{{tooltip}}</span>
    </v-tooltip>
  </div>
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
import { has } from 'lodash'

import { constants } from 'vs-common'
import vsform from '../index'
import mixin from './vs-item-mixin'

export default {
  name: 'vs-item',
  mixins: [mixin],
  data: function() {
    return {
      internalSchema: this.schema, // nötig sonst geht drag drop nicht
    }
  },
  computed: {
    itemList: {
      get() {
        return this.schemaManager.getChildrenComponents(this.internalSchema, this.node)
      },
      // set for drag drop
      set(value) {
        // todo emit event
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
      return this.compo && has(this.compo, 'children') && !has(this.compo, 'hasDirectChildren')
    },
    isDraggable() {
      return this.designMode ? 'draggable' : 'div'
    },
    isDraggableClass() {
      return this.designMode ? 'dragArea' : ''
    },
    getContainerStyle() {
      let cl = ''
      if (this.compo.style && this.compo.style.dense) {
        cl = 'grid-container-dense'
      } else {
        cl = 'grid-container'
      }
      if (this.designMode) {
        cl = cl + ' dragArea'
      }
      return cl
    },
    gridStyle() {
      return {
        // gridRowGap: '10px',
        // gridColumnGap: '10px'
      }
    },
    tooltipDisabled() {
      return !(this.compo && this.compo.tooltip)
    },
    tooltip() {
      return this.compo && this.compo.tooltip ? this.compo.tooltip : ''
    },
    dragOptions() {
      return {
        group: this.internalSchema.id || this.internalSchema.name,
        disabled: !this.designMode
      }
    },
    isFocused() {
      return this.schemaManager.selection.length === 1 && this.schemaManager.selection[0] === this.compo
    },
    isSelected() {
      return !this.isFocused && this.schemaManager.selection.includes(this.compo)
    }
  },
  methods: {
    currentView(name) {
      return vsform.components[this.compo.type]
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
    },
    changeSelection(e) {
      if (!this.designMode) return
      this.schemaManager.beforeChangeSelection(constants.changeSel.undef)
      this.$nextTick(function () {
        if (this.schemaManager.canChangeSelection === constants.changeSel.yes) {
          this.schemaManager.changeSelection(this.compo.id, e.shiftKey || e.ctrlKey)
        }
      })
    }
  },
  components: {
    draggable
  },
}
</script>

<style scoped>
.dragArea {
  min-height: 50px;
}
.focused {
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 10px;
  background: greenyellow;
  border: 1px solid #333;
  z-index: 1;
}

.selected {
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 10px;
  background: lightgray;
  border: 1px solid #333;
  z-index: 1;
}

</style>


