import { components } from 'src/utils/constants'
import { subschema } from './subschema'

export const schema = {
  values: {
    name: 'Thaler',
    vorname: '',
    plz: '',
    ort: '',
    name1: '',
    vorname1: '',
    sub: subschema.values
  },
  components: {
    root: {
      label: 'Kunden',
      type: components.panel,
      children: ['panel1', 'panel2', 'sub']
    },
    panel1: {
      label: 'Panel1',
      type: components.card,
      children: ['name', 'vorname', 'plz', 'ort', 'breite', 'superuser'],
      xl: 6
    },
    name: {
      field: 'name',
      type: components.text,
      label: 'Name',
      placeholder: 'Name eingeben...',
      xl: 6
    },
    vorname: {
      field: 'vorname',
      type: components.text,
      label: 'Vorname',
      placeholder: 'Vorname eingeben...',
      xl: 6
    },
    plz: {
      field: 'plz',
      type: components.text,
      label: 'plz',
      placeholder: 'plz eingeben...',
      xl: 6
    },
    ort: {
      field: 'ort',
      type: components.text,
      label: 'ort',
      placeholder: 'ort eingeben...',
      xl: 6
    },
    breite: {
      field: 'breite',
      type: components.slider,
      label: 'Breite',
      xl: 6
    },
    superuser: {
      field: 'superuser',
      type: components.checkbox,
      label: 'Superuser',
      xl: 2
    },
    panel2: {
      label: 'Panel1',
      type: components.card,
      children: ['name1', 'strasse1'],
      xl: 6
    },
    name1: {
      field: 'name1',
      type: components.text,
      label: 'Name1',
      placeholder: 'Name eingeben...',
      xl: 6
    },
    vorname1: {
      field: 'vorname1',
      type: components.text,
      label: 'Vorname1',
      placeholder: 'Vorname eingeben...',
      xl: 6
    },
    strasse1: {
      field: 'strasse1',
      type: components.text,
      label: 'strasse1',
      placeholder: 'Vorname eingeben...',
      xl: 6
    },
    sub: {
      field: 'sub',
      type: components.subschema,
      schema: subschema,
      label: 'Subschema',
      xl: 12
    }
  }
}
