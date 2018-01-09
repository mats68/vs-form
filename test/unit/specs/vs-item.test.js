import Vue from 'vue'
import { shallow, mount } from 'vue-test-utils'

import VsForm from 'src/components/vs-form'
import VsItem from 'src/components/vs-item'

import { Schema, examples } from 'vs-schema'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

// todo Vue.use
Vue.component('vs-form', VsForm)
Vue.component('vs-item', VsItem)

describe('VsItem miniSchema', () => {
  let Cmp, CmpName, CmpRoot

  beforeEach(() => {
    Cmp = shallow(VsItem, {
      propsData: {
        schema: Schema(examples.miniSchema),
        node: 'name'
      }
    })

    CmpName = mount(VsItem, {
      propsData: {
        schema: Schema(examples.miniSchema),
        node: 'name'
      }
    })

    CmpRoot = mount(VsItem, {
      propsData: {
        schema: Schema(examples.miniSchema),
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
