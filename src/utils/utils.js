// import { isObject } from 'lodash'
import { components } from 'src/utils/constants'

export const updateSchemaId = function(schema, id) {
  if (!schema.components) {
    return
  }

  schema.id = id

  Object.keys(schema.components).forEach(function(key) {
    if (schema.components[key].type === components.subschema) {
      updateSchemaId(schema.components[key].schema, schema.id + '-' + key)
    }
  })
}

export const formatJSON = function (obj) {
  return JSON.stringify(obj, null, 2)
}
