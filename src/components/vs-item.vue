<template>
  <div @click.stop="changeSelection($event)">
    <div v-if="designMode" :class="{focused: isFocused, selected: isSelected}"></div>
    <component :is="currentView(node)" v-bind="currentProperties(node)" v-on:updateValue="updateValue">
      <component v-if="isContainer" :is="isDraggable" class="grid-container grid-row" :style="gridStyle" :class="isDraggableClass" :options="dragOptions" v-model="itemList">
        <div v-for="component in itemList" :class="colAndRowSize(component)" :key="component.id">
          <vs-item v-bind="currentProperties(component.node)" v-on:updateValue="updateValue"></vs-item>
        </div>
      </component>
    </component>
  </div>

</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
// import { isArray } from 'lodash'

import vsform from '../index'
import { EventBus } from './event-bus.js'

// Fields
// import VsTableSingleEditor from '../components/fields/vs-table-single-editor'

export default {
  name: 'vs-item',
  data: function() {
    return {
      internalSchema: this.schema, // nötig sonst geht drag drop nicht
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
    schemaManager: {
      type: Object,
      required: true
    },
    designMode: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Array,
      required: true
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
        // debugger
        return this.schemaManager.getChildrenComponents(
          this.internalSchema,
          this.node
        ) // getChildrenComponents(this.internalSchema, this.node)
      },
      set(value) {
        //todo emit event
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
    gridStyle() {
      return {
        gridRowGap: '10px',
        gridColumnGap: '10px'
      }
    },
    dragOptions() {
      // debugger
      return {
        group: this.internalSchema.id || this.internalSchema.name,
        disabled: !this.designMode
      }
    },
    isFocused() {
      return this.selection.length === 1 && this.selection[0] === this.compo
    },
    isSelected() {
      return !this.isFocused && this.selection.includes(this.compo)
    }
  },
  methods: {
    currentView(name) {
      return vsform.components[this.compo.type]

    /*       if (
        this.compo &&
        this.compo.field &&
        isArray(this.internalSchema.values[this.compo.field]) &&
        this.compo.type === this.internalSchema.components.text // array NUR Text-Felder erlaubt
      ) {
        return VsTableSingleEditor
      } else {
        // debugger
        return vsform.components[this.compo.type]
      }
    */
    },
    updateValue(fieldPath, value) {
      this.$emit('updateValue', fieldPath, value)
    },
    currentProperties(name) {
      return {
        schema: this.internalSchema,
        node: name,
        designMode: this.designMode,
        options: this.options,
        schemaManager: this.schemaManager,
        selection: this.selection
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
    },
    changeSelection(e) {
      if (!this.designMode) return
      EventBus.$emit('changeSelection', this.compo.id, e.shiftKey || e.ctrlKey)
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


