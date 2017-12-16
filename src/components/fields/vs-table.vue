<template>
  <v-data-table :headers="headers" :items="items" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
      <td v-for="item in props.item" :key="item">{{ item }}</td>
    </template>

  </v-data-table>

</template>

<script>
import mixin from 'src/components/vs-item-mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      headers: [],
      items: []
    }
  },
  created() {
    this.headers = [{ text: this.label, value: this.item.field, align: 'left' }]
    this.items = this.editValue.map(val => {
      return { [this.item.field]: val }
    })
  }
}
</script>

<style>

</style>
