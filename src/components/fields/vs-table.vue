<template>
  <v-card>
    <v-card-title>
      <v-btn flat icon color="indigo" slot="activator" @click="add">
        <v-icon>add_box</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search" ref="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>
          <v-text-field :value="getValue(props.item)" :ref="refNewItem(props.item)"></v-text-field>
        </td>
      </template>
    </v-data-table>
    {{items}}
  </v-card>

</template>

<script>
import mixin from 'src/components/vs-item-mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      headers: [],
      items: [],
      search: ''
    }
  },
  methods: {
    add() {
      this.items.push({ [this.compo.field]: 'Neu', newItem: true })
      this.$nextTick(() => {
        this.$refs.newRef.focus()
        this.items = this.items.map(val => {
          return { [this.compo.field]: val[this.compo.field] }
        })
      })
      // todo  update value this.editValue.push('')
    },
    refNewItem(item) {
      return item.newItem ? 'newRef' : ''
    },
    getValue(item) {
      return item[this.compo.field]
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
