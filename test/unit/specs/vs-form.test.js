import Vue from 'vue'
import { shallow } from 'vue-test-utils'

import VsForm from 'src/components/vs-form'
import VsItem from 'src/components/vs-item'

import {SchemaManager, examples} from 'vs-schema'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

// todo Vue.use
Vue.component('vs-form', VsForm)
Vue.component('vs-item', VsItem)

describe('VsForm miniSchema', () => {
  let Cmp

  beforeEach(() => {
    let schemaManager = SchemaManager(examples.listSchemas.schemaCorrectType, examples.listSchemas)
    let schema = schemaManager.schema

    Cmp = shallow(VsForm, {
      propsData: {
        schema: schema
      }
    })
  })

  it('has the expected html structure', () => {
    expect(Cmp.element).toMatchSnapshot()
  })
})
