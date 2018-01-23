export default {
  name: {
    label: 'Name'
  },
  vorname: {
    label: 'Vorname'
  },
  adresse: {
    label: 'Adresse',
    children: ['strasse', 'plz', 'ort']
  },
  strasse: {
    label: 'Strasse'
  },
  plz: {
    label: 'PLZ'
  },
  ort: {
    label: 'Ort',
    children: ['land']
  },
  land: {
    label: 'Land',
  }
}
