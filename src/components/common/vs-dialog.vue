<template>
  <v-dialog v-model="showDialog" persistent @keydown.esc="close" max-width="500px">
    <v-card>
      <v-card-title>
        <h4>{{title}}</h4>
        <v-spacer></v-spacer>
      </v-card-title>
      <slot></slot>
      <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn v-if="btnOk" @click="closeOk" flat color="blue darken-1">Ok</v-btn>
        <v-btn v-if="btnCancel" @click="close" flat color="grey">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { constants } from 'vs-common'

export default {
  computed: {
    btnOk() {
      return this.buttons.indexOf(constants.buttons.btnOk) > -1
    },
    btnCancel() {
      return this.buttons.indexOf(constants.buttons.btnCancel) > -1
    }
  },
  methods: {
    closeOk() {
      this.$emit('closeOk')
    },
    close() {
      if (this.canClose) this.$emit('close')
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    canClose: {
      type: Boolean,
      required: true
    },
    buttons: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  mounted() {
    // this.show = this.showDialog
    //console.log('dialog update')
  },


}
</script>

<style>

</style>
