<template>
  <div class="grid-container grid-row padding">
    <v-text-field v-model="numberVal" v-bind="fieldProperties" class="xs-8 md-10"></v-text-field>
    <v-btn @click="dec" flat class="xs-2 md-1" fab icon color="indigo"><v-icon>arrow_back</v-icon></v-btn>
    <v-btn @click="inc" flat class="xs-2 md-1" dark fab icon color="indigo"><v-icon dark>arrow_forward</v-icon></v-btn>
  </div>
</template>

<script>
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      number: this.editValue
    }
  },
  computed: {
    numberVal: {
      get() {
        return this.number
      },
      set(newValue) {
        this.number = newValue.replace(/\D/g, '')
        this.editValue = Number(this.number)
      }
    }
  },
  methods: {
    inc() {
      this.number = isNaN(this.number) ? 0 : Number(this.number) + 1
    },
    dec() {
      this.number = isNaN(this.number) ? 0 : Number(this.number) - 1
    },
  }
}
</script>

<style>
.padding {
  padding: 0;
  margin: 0;
  grid-gap: 0;
}

</style>
