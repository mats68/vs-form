import Vue from 'vue'
import { shallow, mount } from 'vue-test-utils'

import VsForm from 'src/components/vs-form'
import VsItem from 'src/components/vs-item'

import { miniSchema } from 'vs-schema'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

// todo Vue.use
Vue.component('vs-form', VsForm)
Vue.component('vs-item', VsItem)

describe('VsItem miniSchema', () => {
  let Cmp, Cmp2

  beforeEach(() => {
    Cmp = shallow(VsItem, {
      propsData: {
        schema: miniSchema,
        node: 'name'
      }
    })

    Cmp2 = mount(VsItem, {
      propsData: {
        schema: miniSchema,
        node: 'name'
      }
    })
  })

  it('shallow render', () => {
    expect(Cmp.element).toMatchSnapshot()
  })

  it('deep render', () => {
    expect(Cmp2.element).toMatchSnapshot()
  })

  it('is a vsitem component', () => {
    expect(Cmp2.is(VsItem)).toBe(true)
  })
})
