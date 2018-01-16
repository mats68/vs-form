<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span>{{title}}</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <slot></slot>
      <v-btn v-if="btnOk" @click="closeOk" flat color="blue">Ok</v-btn>
      <v-btn v-if="btnCancel" @click="close" flat color="grey">Cancel</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { constants } from 'vs-common'

export default {
  data() {
    return {
      // show: true
    }
  },
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
      // this.showDialog = false
      this.$emit('closeOk')
    },
    close() {
      // this.show = false
      this.$emit('close')
    }
  },
  props: {
    showDialog: {
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
