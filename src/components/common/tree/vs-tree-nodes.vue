<template>
  <div>
    <vs-tree-node v-if="rootItem.isRoot" :item="rootItem" :treeData="treeData" v-on:expand="expand" v-on:checked="checked" :checkboxes="checkboxes"></vs-tree-node>
    <draggable v-if="showChildren" v-model="itemList" :options="dragOptions" @start="startDrag" :move="checkMove">
      <div v-for="item in itemList" :key="item.key">
        <vs-tree-node :item="item" :treeData="treeData" v-on:expand="expand" v-on:checked="checked" :checkboxes="checkboxes"></vs-tree-node>
        <vs-tree-nodes :treeData="treeData" :rootItem="item" :canDragDrop="canDragDrop" v-on:expand="expand" v-on:checked="checked" v-on:drop="drop" :checkboxes="checkboxes"></vs-tree-nodes>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

import VsTreeNode from './vs-tree-node'
import {strings} from 'vs-common'

export default {
  name: 'vs-tree-nodes',
  data: () => {
    return {
      tree: {}
    }
  },
  computed: {
    itemList: {
      get() {
        return this.rootItem.children.map(key => this.treeData[key])
      },
      set(value) {
        const children = value.map(item => item.key)
        this.$set(this.tree[this.rootItem.key], 'children', children)
        this.$emit('drop')
      }
    },
    showChildren() {
      return this.rootItem.children && this.rootItem.children.length > 0 && this.rootItem.expanded
    },
    dragOptions() {
      return {
        group: 'test',
        disabled: !this.canDragDrop
      }
    },

  },
  methods: {
    expand(item) {
      this.$emit('expand', item)
    },
    checked(item) {
      this.$emit('checked', item)
    },
    drop() {
      this.$emit('drop')
    },
    startDrag: function (evt) {
    },
    checkMove(evt) {
      return evt.srcElement.innerText.trim() !== strings.tree.emptyNodeLabel // 'empty'
    }
  },
  props: {
    treeData: {
      type: Object,
      required: true
    },
    rootItem: {
      type: Object,
      required: true
    },
    canDragDrop: {
      type: Boolean,
      default: false
    },
    checkboxes: {
      type: Boolean,
      default: false
    }
  },
  components: {
    draggable,
    VsTreeNode
  },
  created() {
    this.tree = this.treeData
  }
}
</script>

<style>

</style>
