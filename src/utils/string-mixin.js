import strings from 'src/utils/strings'

export default {
  methods: {
    getStr(str) {
      return strings[str]
    }
  }
}
