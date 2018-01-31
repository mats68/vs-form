import Vue from 'vue'
import { shallow } from 'vue-test-utils'

import {vsform} from 'src/index'
import VsForm from 'src/components/vs-form'

import {SchemaManager, examples} from 'vs-schema'

import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(vsform)

describe('VsForm Schema', () => {
  let Cmp, schemaManager
  beforeEach(() => {
    schemaManager = new SchemaManager(examples.listSchemas.schemaCorrectType, examples.listSchemas)
    // let schema = schemaManager.schema

    Cmp = shallow(VsForm, {
      propsData: {
        schemaManager
      }
    })
  })

  it('has the expected html structure', () => {
    expect(Cmp.element).toMatchSnapshot()
  })
})
