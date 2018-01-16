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
      <!-- <v-text-field v-model="test"></v-text-field> -->
      <!-- <v-btn @click="eval1">Eval</v-btn> -->
      <!-- {{test1}} -->
      <!-- <br> {{test2}} -->
      <!-- <vs-item :schema="miniSchema" node="root" :designMode="designMode"></vs-item> -->
      <!-- <vs-form :schema="miniSchema" :designMode="designMode"></vs-form> -->
      <vs-form :schema="schema" :listSchemas="listSchemas" :designMode="designMode"></vs-form>
      {{schema.values}}
    </v-content>
  </v-app>
</template>

<script>

import {examples} from 'vs-schema'
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
    listSchemas: {},
    drawer: null,
    designMode: true,
    test:
      'Hallo ${ld.capitalize(v.vorname)} (${label("name")}: [name]) heute ist der ${date.format(curDate,"DD.MM.YYYY")}, Zeit ${date.format(curDate,"hh.mm.ss")}', // eslint-disable-line
    test1: '',
    test2: ''
  }),
  computed: {
  },
  methods: {
  },
  props: {
    source: String
  },
  created() {
    // this.schemaManager = SchemaManager(examples.listSchemas.schemaCorrectType, examples.listSchemas)
    this.schema = examples.listSchemas.schemaCorrectType // this.schemaManager.schema
    this.listSchemas = examples.listSchemas
    // console.log('schemaManger', this.schemaManager)
  }
}
</script>

<style scoped>
.rahmen {
  width: 100%;
  padding: 10px;
}
</style>
