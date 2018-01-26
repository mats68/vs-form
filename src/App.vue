<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Schema-Form</v-toolbar-title>
      <!-- <v-text-field prepend-icon="search" hide-details single-line></v-text-field> -->
      <v-checkbox hide-details v-model="designMode" label="Drag & Drop"></v-checkbox>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <vs-form :schemaManager="schemaManager" :designMode="designMode" v-on:valueUpdated="valueUpdated"></vs-form>
    </v-content>
  </v-app>
</template>

<script>

import {examples, SchemaManager} from 'vs-schema'
import treeExample from './components/common/tree/treeExample.js'
// import Expr from 'expression-parser'
// import math from 'mathjs'

// const util = {
//   date(arg) {
//     alert(arg)
//   }
// }

export default {
  data: () => ({
    schema: {},
    drawer: null,
    designMode: true,
    test:
      'Hallo ${ld.capitalize(v.vorname)} (${label("name")}: [name]) heute ist der ${date.format(curDate,"DD.MM.YYYY")}, Zeit ${date.format(curDate,"hh.mm.ss")}', // eslint-disable-line
    treeExample
  }),
  computed: {
  },
  methods: {
    valueUpdated(fieldPath, value, values) {
      // console.log('values1', JSON.stringify(values))
    }
  },
  props: {
    source: String
  },
  created() {
    this.schemaManager = new SchemaManager(examples.listSchemas.schemaCorrectType, examples.listSchemas)
    if (this.schemaManager.errors > 0) {
      alert(`Schema: ${this.schemaManager.schema.name} hat Fehler`)
      alert(this.schemaManager.printErrors())
    }
    this.schema = this.schemaManager.schema
  }
}
</script>

<style scoped>
.rahmen {
  width: 100%;
  padding: 10px;
}
</style>
