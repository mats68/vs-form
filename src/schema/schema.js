export const schema = {
  values: {
    name: ''
  },
  components: {
    label: 'Kunden',
    children: ['name']
  },
  name: {
    field: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Name eingeben...',
    xl: 6
  }
}
