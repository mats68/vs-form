<template>
  <v-card>
    <v-card-title>
      <!-- <v-badge>
        <v-tooltip bottom slot="badge">
          <v-icon  slot="activator" @click="add">lock</v-icon>
          <span>Add item</span>
        </v-tooltip>
      </v-badge> -->
      <v-tooltip v-model="show1" bottom>
        <v-btn icon flat color="primary" slot="activator" @click="add">
          <v-icon>add_box</v-icon>
        </v-btn>
        <span>{{getStr("strAddItem")}}</span>
      </v-tooltip>
      <v-tooltip v-model="show2" bottom>
        <v-btn icon flat color="error" slot="activator" @click="remove" :disabled="selected.length < 1">
          <v-icon>remove_circle</v-icon>
        </v-btn>
        <span>{{getStr("strRemoveItems")}}</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" :label="getStr('strSearch')" single-line hide-details v-model="search" ref="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" v-model="selected" :search="search" item-key="ort" select-all hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
        </td>
        <td>
          <v-text-field :value="getValue(props.item)" @change="change" :ref="refNewItem(props.item)"></v-text-field>
        </td>
      </template>
    </v-data-table>
  </v-card>

</template>

<script>
import mixin from 'src/components/vs-item-mixin'

import strMixin from 'src/utils/string-mixin'

export default {
  mixins: [mixin, strMixin],
  data() {
    return {
      headers: [],
      items: [],
      selected: [],
      search: '',
      show1: false,
      show2: false,
    }
  },
  methods: {
    add() {
      this.items.push({ [this.compo.field]: '', newItem: true })
      this.selected = []
      this.$nextTick(() => {
        this.$refs.newRef.focus()
        this.items = this.items.map(val => {
          return { [this.compo.field]: val[this.compo.field] }
        })
      })
      // todo  update value this.editValue.push('')
    },
    change(newValue) {
      console.log(newValue)
    },
    remove() {
      this.items = this.items.filter(el => {
        return this.selected.indexOf(el) < 0
      })
    },
    refNewItem(item) {
      return item.newItem ? 'newRef' : ''
    },
    getValue(item) {
      return item[this.compo.field]
    },
    compoProperties() {
      // debugger
      return {
        schema: this.schema,
        node: this.compo.id,
        designMode: this.designMode,
        options: { renderInlineEdit: true }
      }
    }
  },
  created() {
    this.headers = [
      { text: this.label, value: this.compo.field, align: 'left' }
    ]
    this.items = this.editValue.map(val => {
      return { [this.compo.field]: val }
    })
    // console.log(this.schema)
  }
}
</script>

<style scoped>
.maxheight {
  max-height: 300px;
}
</style>
