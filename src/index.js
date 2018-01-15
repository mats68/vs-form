import VsForm from './components/vs-form'
import VsItem from './components/vs-item'
import mixin1 from './components/vs-item-mixin'

// Containers
import VsCard from './components/containers/vs-card'
import VsPanel from './components/containers/vs-panel'
import VsSubschema from './components/containers/vs-subschema'

// Fields
// import VsTableSingleEditor from './components/fields/vs-table-single-editor'
import VsTextField from './components/fields/vs-text-field'
import VsSlider from './components/fields/vs-slider'
import VsCheckbox from './components/fields/vs-checkbox'

export const vsform = {
  install(Vue, options) {
    Vue.component('vs-form', VsForm)
    Vue.component('vs-item', VsItem)
  },
  mixin: mixin1,
  components: {
    card: VsCard,
    panel: VsPanel,
    subschema: VsSubschema,
    text: VsTextField,
    checkbox: VsCheckbox,
    slider: VsSlider
  }

}

export default vsform
