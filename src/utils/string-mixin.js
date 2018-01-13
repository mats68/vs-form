import strings from './strings'

export default {
  methods: {
    getStr(str) {
      return strings[str]
    }
  }
}
