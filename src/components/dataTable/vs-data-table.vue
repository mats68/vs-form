<template>
  <v-card>
     <v-card-title>
       <v-btn icon flat>
         <v-icon>add_box</v-icon>
       </v-btn>
     </v-card-title>
     <v-data-table :headers="tableHeaders" :items="tableItems" v-model="selected" :search="search" select-all class="elevation-1">
        <template slot="items" slot-scope="props">
          <tr @click="focusRow(props.item)" :active="props.item === focused">
            <td class="checkbox">
              <v-checkbox v-model="props.item.selected"></v-checkbox>
            </td>
            <td v-for="column in tableHeaders" :key="column.component">
              {{props.item[column.value]}}
            </td>
          </tr>
        </template>
     </v-data-table>
  </v-card>
</template>

<script>
import mixin from '../vs-item-mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      selected: [],
      search: '',
      focused: null
    }
  },
  methods: {
    focusRow(item) {
      console.log(item)
      this.focused = item
    }
  },
  computed: {
    tableHeaders() {
      // debugger
      // console.log(this.compo.columns.map(c => this.schema.components[c].label))
      return this.compo.columns.map(c => {
        const comp = this.schema.components[c.component]
        return {
          text: comp.label,
          value: comp.data.field,
          align: c.align ? c.align : 'left',
          sortable: c.sortable ? c.sortable : false,
          width: c.width ? c.width : '',
        }
      })
    },
    tableItems() {
      return this.schema.valuesDataTable
    }
  }

}
</script>

<style>

</style>
