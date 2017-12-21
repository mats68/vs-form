import Vue from 'vue'
import { shallow } from 'vue-test-utils'

import VsForm from 'src/components/vs-form'
import VsItem from 'src/components/vs-item'

import { miniSchema } from 'vs-schema'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

// todo Vue.use
Vue.component('vs-form', VsForm)
Vue.component('vs-item', VsItem)

describe('VsForm miniSchema', () => {
  let Cmp

  beforeEach(() => {
    Cmp = shallow(VsForm, {
      propsData: {
        schema: miniSchema
      }
    })
  })

  it('has the expected html structure', () => {
    expect(Cmp.element).toMatchSnapshot()
  })
})
