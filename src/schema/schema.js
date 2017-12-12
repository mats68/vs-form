export const schema = {
  values: {
    name: ''
  },
  components: {
    root: {
      label: 'Kunden',
      type: 'form',
      children: ['name', 'vorname', 'panel'],
    },
    name: {
      field: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Name eingeben...',
      xl: 12
    },
    vorname: {
      field: 'vorname',
      type: 'text',
      label: 'Vorname',
      placeholder: 'Vorname eingeben...',
      xl: 1
    },
    panel: {
      label: 'Panel',
      type: 'panel',
      children: ['name1', 'vorname1'],
      xl: 6
    },
    name1: {
      field: 'name1',
      type: 'text',
      label: 'Name1',
      placeholder: 'Name eingeben...',
      xl: 2
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
