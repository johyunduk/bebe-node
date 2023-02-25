import _ from 'lodash'

export function serverBearerHeader (token) {
  return {
    headers: {
      authorization: 'Bearer ' + token,
    },
  }
}

export function sendOk (res) {
  return res.json({ result: 'OK' })
}
