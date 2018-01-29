<template>
  <div class="grid-container grid-row padding">
    <v-text-field v-model="numberVal" v-bind="fieldProperties" :class="width"></v-text-field>
    <v-btn v-if="!hideButtons" @mousedown="inc" @mouseup="clear" class="xs-2 md-1" flat fab icon color="indigo"><v-icon>add_circle</v-icon></v-btn>
    <v-btn v-if="!hideButtons" @mousedown="dec" @mouseup="clear" class="xs-2 md-1" flat fab icon color="indigo"><v-icon>remove_circle_outline</v-icon></v-btn>
  </div>
</template>

<script>
import {isNumber} from 'lodash'
import mixin from '../vs-item-mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      number: this.editValue,
      timer: null
    }
  },
  computed: {
    numberVal: {
      get() {
        return this.number
      },
      set(newValue) {
        this.number = isNumber(newValue) ? newValue : newValue.replace(/\D/g, '')
        this.editValue = Number(this.number)
      }
    },
    width() {
      return this.hideButtons ? 'xs-12' : 'xs-8 md-10'
    }
  },
  methods: {
    // keydown(event) {
    //   // if (event.key === 'a') {
    //   //   event.preventDefault()
    //   // }
    // },
    inc() {
      this.numberVal = isNaN(this.number) ? 0 : Number(this.number) + 1
      this.timer = setTimeout(this.inc, 100)
    },
    dec() {
      this.numberVal = isNaN(this.number) ? 0 : Number(this.number) - 1
      this.timer = setTimeout(this.dec, 100)
    },
    clear() {
      clearTimeout(this.timer)
    }
  },
  props: {
    hideButtons: {
      type: Boolean,
      default: false
    }
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
