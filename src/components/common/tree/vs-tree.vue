<template>
  <v-card>
    <v-card-text>
      <vs-tree-nodes :treeData="tree" :rootItem="rootItem" v-on:expand="expand" v-on:checked="checked" v-on:drop="drop" :canDragDrop="canDragDrop" :checkboxes="checkboxes"></vs-tree-nodes>
    </v-card-text>
  </v-card>
</template>

<script>
import {cloneDeep, difference, has} from 'lodash'

import VsTreeNodes from './vs-tree-nodes'
import {constants, strings} from 'vs-common'

export default {
  data: () => ({
    tree: {},
    rootItem: {}
  }),
  computed: {

  },
  methods: {
    expand(item) {
      this.tree[item.key].expanded = !this.tree[item.key].expanded
      this.$emit('expand', item)
    },
    checked(item) {
      const updateChildrenState = (tree, node) => {
        if (node.children) {
          node.children.forEach(el => {
            if (el && el.indexOf(constants.tree.emptyNodeKey) === -1) {
              tree[el].checkState = node.checkState
              updateChildrenState(tree, tree[el])
            }
          })
        }
      }

      const updateIndeterminateState = (tree, nodeKey) => {
        Object.keys(tree).forEach(key => {
          if (tree[key].children && tree[key].children.indexOf(nodeKey) > -1) {
            const allChecked = tree[key].children.filter(el => tree[el].checkState === constants.tree.checkState.checked).length === tree[key].children.length
            const allUnChecked = tree[key].children.filter(el => tree[el].checkState === constants.tree.checkState.unchecked).length === tree[key].children.length
            if (allChecked) {
              tree[key].checkState = constants.tree.checkState.checked
            } else if (allUnChecked) {
              tree[key].checkState = constants.tree.checkState.unchecked
            } else {
              tree[key].checkState = constants.tree.checkState.indeterminate
            }

            updateIndeterminateState(tree, key)
          }
        })
      }

      const obj = this.tree[item.key]
      if (obj.checkState === constants.tree.checkState.unchecked) { obj.checkState = constants.tree.checkState.checked } else { obj.checkState = constants.tree.checkState.unchecked }
      updateChildrenState(this.tree, obj)
      updateIndeterminateState(this.tree, obj.key)

      this.$emit('checked', item)
    },
    drop() {
      this.updateEmptyChildren(this.tree)
      this.setLevel(this.tree)
    },
    setLevel(tree) {
      let getChilds = (tree, items, level) => {
        let children = []
        items.forEach(key => {
          tree[key].level = level
          if (tree[key].children) {
            children = children.concat(tree[key].children)
          }
        })
        return children
      }
      let childs = this.rootItem.children
      this.rootItem.level = 0
      let level = 1
      while (childs.length > 0) {
        childs = getChilds(tree, childs, level)
        // check recursion
        if (level > 1000) {
          alert('Possible recursion of children, Please check the data!')
          tree = {}
          childs = []
        }
        level++
      }
    },
    updateEmptyChildren(tree) {
      this.deleteEmptyChildren(tree)
      let counter = 0
      Object.keys(tree).forEach((key) => {
        const obj = tree[key]
        if (has(obj, 'children') && obj.children.length === 0) {
          const k = constants.tree.emptyNodeKey + counter.toString()
          this.$set(tree, k, {})
          this.$set(tree[k], 'label', strings.tree.emptyNodeLabel)
          tree[key].children.push(k)
        }
      })
      // console.log('after update empty', JSON.stringify(tree, null, 2))
    },
    deleteEmptyChildren(tree) {
      let newObj = {}
      Object.keys(tree)
        .filter(key => key.indexOf(constants.tree.emptyNodeKey) === -1)
        .map(el => tree[el])
        .forEach(el => {
          if (el.children) {
            el.children = el.children.filter(key => key && key.indexOf(constants.tree.emptyNodeKey) === -1)
          }
          newObj[el.key] = el
        })
      tree = cloneDeep(newObj)
    },
  },
  props: {
    treeData: {
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
    VsTreeNodes
  },
  created() {
    this.tree = cloneDeep(this.treeData)
    // add a root node
    this.$set(this.tree, constants.tree.rootNodeKey, {})
    this.$set(this.tree[constants.tree.rootNodeKey], 'label', strings.tree.rootNodeLabel)

    const keys = Object.keys(this.tree)
    keys.forEach(key => {
      this.$set(this.tree[key], 'key', key)
      this.$set(this.tree[key], 'expanded', false)
      this.$set(this.tree[key], 'checkState', constants.tree.checkState.unchecked)
      this.$set(this.tree[key], 'indeterminate', false)
    })
    // figure out the root nodes
    let childs = []
    keys.forEach(key => { if (this.tree[key].children) childs = childs.concat(this.tree[key].children) })
    let rootItems = difference(keys, childs)
    rootItems = rootItems.filter(el => el !== constants.tree.rootNodeKey)

    // console.log('rootItems', rootItems)
    if (rootItems.length > 1) {
      this.$set(this.tree[constants.tree.rootNodeKey], 'children', rootItems)
      this.rootItem = this.tree[constants.tree.rootNodeKey]
    } else if (rootItems.length === 1) {
      this.$delete(this.tree, constants.tree.rootNodeKey)
      this.rootItem = rootItems.map(item => this.tree[item])[0]
    } else {
      // error
    }
    this.$set(this.rootItem, 'isRoot', true)

    this.updateEmptyChildren(this.tree)
    this.setLevel(this.tree)
    // console.log(JSON.stringify(this.tree, null, 2))
  }
}
</script>

<style>

</style>
