export const schema = {
  values: {
    name: ''
  },
  components: {
    root: {
      label: 'Kunden',
      type: 'form',
      children: ['panel1', 'panel2'],
    },
    panel1: {
      label: 'Panel1',
      type: 'card',
      children: ['name', 'vorname', 'plz', 'ort'],
      xl: 6
    },
    name: {
      field: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Name eingeben...',
      xl: 6
    },
    vorname: {
      field: 'vorname',
      type: 'text',
      label: 'Vorname',
      placeholder: 'Vorname eingeben...',
      xl: 6
    },
    plz: {
      field: 'plz',
      type: 'text',
      label: 'plz',
      placeholder: 'plz eingeben...',
      xl: 6
    },
    ort: {
      field: 'ort',
      type: 'text',
      label: 'ort',
      placeholder: 'ort eingeben...',
      xl: 6
    },
    panel2: {
      label: 'Panel1',
      type: 'card',
      children: ['name1', 'vorname1', 'strasse1'],
      xl: 6
    },
    name1: {
      field: 'name1',
      type: 'text',
      label: 'Name1',
      placeholder: 'Name eingeben...',
      xl: 6
    },
    vorname1: {
      field: 'vorname1',
      type: 'text',
      label: 'Vorname1',
      placeholder: 'Vorname eingeben...',
      xl: 6
    },
    strasse1: {
      field: 'strasse1',
      type: 'text',
      label: 'strasse1',
      placeholder: 'Vorname eingeben...',
      xl: 6
    },
  }
}
