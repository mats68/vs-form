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
    </v-toolbar>
    <v-content>
      <vs-form :schema="schema"></vs-form>
      <!-- <vs-form :schema="schema" startItem="tubel"></vs-form> -->
    </v-content>
  </v-app>
</template>

<script>
import { schema } from 'src/schema/schema'

export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    schema: () => { return schema }
  },
  props: {
    source: String
  }
}
</script>