<template>
  <v-layout row wrap :tag="getTag">
    <v-flex v-for="field in list" :key="field.id" :class="colWidth">
      <vs-text-field></vs-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
import draggable from 'vuedraggable'
import VsTextField from './vs-text-field'

export default {
  name: 'vs-item',
  data: function() {
    return {
      values: this.schema.values
    }
  },
  props: {
    startItem: {
      type: String,
      default: 'form'
    },
    schema: {
      type: Object,
      required: true
    },
    designMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    list() {
      return this.getItemsFromSchema()
    },
    colWidth() {
      return 'xl8'
    },
    getTag() {
      return this.designMode ? 'draggable' : 'div'
    }
  },
  methods: {
    getItemsFromSchema() {
      let resArray = []
      if (!this.schema.components[this.startItem]) return
      if (!this.schema.components[this.startItem].hidden) {
        this.schema.components[this.startItem].children.forEach(item => {
          let c = this.schema.components[item]
          if (!c || c.hidden) {
            return
          }
          c.id = item
          resArray.push(c)
        })
      }
      return resArray
    }
  },

  components: {
    VsTextField,
    draggable
  },
  mounted() {
    // console.log(this.values.name)
  }
}
</script>

<style>

</style>
