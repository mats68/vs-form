import { components } from 'src/utils/constants'

const subSubschema = {
  values: {
    email1: 'email1',
    telefon1: 'telefon1'
  },
  components: {
    root: {
      label: 'Sub-Subschema',
      type: components.panel,
      children: ['email1', 'telefon1']
    },
    email1: {
      field: 'email1',
      type: components.text,
      label: 'Sub Sub Email',
      placeholder: 'Email eingeben...',
      xl: 3
    },
    telefon1: {
      field: 'telefon1',
      type: components.text,
      label: 'Sub Sub Telefon',
      xl: 3
    }
  }
}

export const subschema = {
  values: {
    email: 'email',
    sub: subSubschema.values
  },
  components: {
    root: {
      label: 'Subschema',
      type: components.panel,
      children: ['email', 'telefon', 'subSub']
    },
    email: {
      field: 'email',
      type: components.text,
      label: 'Email',
      placeholder: 'Email eingeben...',
      xl: 3
    },
    telefon: {
      field: 'telefon',
      type: components.text,
      label: 'Telefon',
      xl: 3
    },
    subSub: {
      field: 'subSub',
      type: components.subschema,
      schema: subSubschema,
      label: 'SubSUBschema',
      xl: 6
    }
  }
}
