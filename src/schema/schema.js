export const schema = {
  values: {
    name: ''
  },
  components: {
    root: {
      label: 'Kunden',
      children: ['name', 'vorname', 'panel']
    },
    panel: {
      label: 'Panel',
      children: ['name1', 'vorname1']
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
  }
}
