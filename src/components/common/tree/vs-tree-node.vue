<template>
  <div>
    <div :style="itemStyle">
      <v-btn @click="expand" flat icon color="blue lighten-2" class="button">
        <v-icon>{{getIcon}}</v-icon>
      </v-btn>
      <v-btn v-if="checkboxes" @click="checked" flat icon class="button">
        <v-icon>{{getCheckBoxIcon}}</v-icon>
      </v-btn>
      <span class="text">{{item.label}}</span>
    </div>
  </div>
</template>

<script>
import { has } from 'lodash'

import {constants} from 'vs-common'

export default {
  computed: {
    getIcon() {
      if (!this.hasChildren) return ''
      return this.item.expanded ? 'remove_circle_outline' : 'add_circle_outline'
    },
    getCheckBoxIcon() {
      // if (this.item.key.indexOf(constants.tree.emptyNodeKey) > -1) return ''
      if (this.item.checkState === constants.tree.checkState.indeterminate) return 'indeterminate_check_box'
      if (this.item.checkState === constants.tree.checkState.checked) return 'check_box'
      if (this.item.checkState === constants.tree.checkState.unchecked) return 'check_box_outline_blank'
    },
    hasChildren() {
      return has(this.item, 'children')  // this.item.children && this.item.children.length > 0
    },
    itemStyle() {
      return {
        height: '30px',
        marginLeft: (this.item.level * 15).toString() + 'px',
      }
    }
  },
  methods: {
    expand() {
      // debugger
      this.$emit('expand', this.item)
    },
    checked() {
      this.$emit('checked', this.item)
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    treeData: {
      type: Object,
      required: true
    },
    checkboxes: {
      type: Boolean,
      default: false
    }
  },

}
</script>

<style>
.text {
  width: 50px;
}
.sameline {
  display: inline;
}
.button {
  width: 20px;
}

</style>
