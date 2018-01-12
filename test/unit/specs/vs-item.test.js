import Vue from 'vue'
import { shallow, mount } from 'vue-test-utils'

import VsForm from 'src/components/vs-form'
import VsItem from 'src/components/vs-item'

import {SchemaManager, examples} from 'vs-schema'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

// todo Vue.use
Vue.component('vs-form', VsForm)
Vue.component('vs-item', VsItem)

describe('VsItem miniSchema', () => {
  let Cmp, CmpName, CmpRoot

  beforeEach(() => {
    let schemaManager = SchemaManager(examples.listSchemas.schemaCorrectType, examples.listSchemas)
    let schema = schemaManager.schema

    Cmp = shallow(VsItem, {
      propsData: {
        schema,
        schemaManager,
        node: 'root'
      }
    })

    CmpName = mount(VsItem, {
      propsData: {
        schema: schema,
        schemaManager,
        node: 'root'
      }
    })

    CmpRoot = mount(VsItem, {
      propsData: {
        schema: schema,
        schemaManager,
        node: 'root'
      }
    })

  })

  it('shallow render', () => {
    expect(Cmp.element).toMatchSnapshot()
  })

  it('deep render name component', () => {
    expect(CmpName.element).toMatchSnapshot()
  })

  it('deep render root component', () => {
    expect(CmpRoot.element).toMatchSnapshot()
  })

  it('is a vsitem component', () => {
    expect(CmpName.is(VsItem)).toBe(true)
  })
})
