export const schema = {
  values: {
    name: ''
  },
  components: {
    form: {
      label: 'Kunden',
      children: ['name', 'vorname']
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
    tubel: {
      field: 'tubel',
      type: 'text',
      label: 'tubel',
      placeholder: 'tubel eingeben...',
      xl: 6
    },
  }
}
