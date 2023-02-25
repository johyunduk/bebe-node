import _ from 'lodash'

export function toPlainObj (obj) {
  if (obj && obj.get) return obj.get({ plain: true })
  return obj
}

export function toPlain (data) {
  if (Array.isArray(data)) return _.map(data, toPlainObj)

  return toPlainObj(data)
}

export function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
