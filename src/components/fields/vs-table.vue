<template>
  <v-card>
    <v-card-title>
      <v-menu bottom offset-y lazy>
        <v-btn flat icon color="indigo" slot="activator" @click="add">
          <v-icon>add_box</v-icon>
        </v-btn>
        <!-- <vs-item :schema="schema" :designMode="designMode" node="plz"></vs-item> -->
      </v-menu>

      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <!-- <td v-for="item in props.item" :key="item">{{ item }}</td> -->
        <td v-for="item in props.item" :key="item"><v-text-field :slot="input" :value="item"></v-text-field></td>
      </template>

    </v-data-table>
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
      this.items.push({ [this.item.field]: '' })
      // todo  update value this.editValue.push('')
    }
  },
  created() {
    this.headers = [{ text: this.label, value: this.item.field, align: 'left' }]
    this.items = this.editValue.map(val => {
      return { [this.item.field]: val }
    })
    // console.log(this.schema)
  }
}
</script>

<style>

</style>
