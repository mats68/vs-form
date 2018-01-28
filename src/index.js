import VsForm from './components/vs-form'
import VsItem from './components/vs-item'
import mixin from './components/vs-item-mixin'

// Containers
import VsCard from './components/containers/vs-card'
import VsPanel from './components/containers/vs-panel'
import VsSubschema from './components/containers/vs-subschema'
import VsExpansionPanel from './components/containers/vs-expansion-panel'
import VsExpansionPanelContent from './components/containers/vs-expansion-panel-content'
import VsTabs from './components/containers/vs-tabs'
import VsTab from './components/containers/vs-tab'

// Fields
// import VsTableSingleEditor from './components/fields/vs-table-single-editor'
import VsTextField from './components/fields/vs-text-field'
import VsSlider from './components/fields/vs-slider'
import VsCheckbox from './components/fields/vs-checkbox'
import VsSelect from './components/fields/vs-select'
import VsRadioGroup from './components/fields/vs-radio-group'
import VsInteger from './components/fields/vs-integer'

// common
import VsDialog from './components/common/vs-dialog'
import VsTree from './components/common/tree/vs-tree'

export const vsform = {
  install(Vue, options) {
    Vue.component('vs-form', VsForm)
    Vue.component('vs-item', VsItem)
    Vue.component('vs-dialog', VsDialog)
    Vue.component('vs-tree', VsTree)
  },
  mixin,
  components: {
    card: VsCard,
    panel: VsPanel,
    subschema: VsSubschema,
    expansionpanel: VsExpansionPanel,
    expansionpanelcontent: VsExpansionPanelContent,
    tabs: VsTabs,
    tab: VsTab,
    text: VsTextField,
    select: VsSelect,
    integer: VsInteger,
    radiogroup: VsRadioGroup,
    checkbox: VsCheckbox,
    slider: VsSlider
  }

}

export default vsform
