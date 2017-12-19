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
      <v-text-field v-model="test"></v-text-field>
      <v-btn @click="eval1">Eval</v-btn>
      {{test1}}
      <br> {{test2}}
      <vs-form :schema="schema" :designMode="designMode"></vs-form>
      {{schema.values}}
    </v-content>
  </v-app>
</template>

<script>
import { schema } from 'src/schema/schema'
import { formatJSON } from 'src/utils/utils'
import expr from 'expression-parser'
// import math from 'mathjs'

// const util = {
//   date(arg) {
//     alert(arg)
//   }
// }

export default {
  data: () => ({
    drawer: null,
    designMode: true,
    test: 'Hallo {ld.capitalize(v.vorname)} ({label("name")}: [name]) heute ist der {date.format(curDate,"dd.mm.YYYY")}',
    test1: '',
    test2: ''
  }),
  computed: {
    schema() {
      return schema
    },
    formatSchema() {
      return formatJSON(this.schema)
    }
  },
  methods: {
    eval1() {
      this.test1 = expr.compile(this.test, schema)
      this.test2 = expr.errors

      // return
      // try {
      //   console.log(expr.parse(this.test))
      // } catch (error) {
      //   console.log(error)
      // }
      // this.test1 = expr.run(this.test, schema)

      // const fn = expr.compile(this.test)
      // console.log(fn())

      // var scope = {
      // x: 3,
      // val: this.schema.values
      // }
      // debugger
      // this.test1 = math.eval(this.test, scope)
    }
  },
  props: {
    source: String
  }
}
</script>