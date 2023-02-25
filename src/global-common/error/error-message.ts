import _ from 'lodash'

const ERR_MSG = {
  EXT_API_CALL_FAIL: 'Unexpected error',
}

export function errorMessage (errCode) {
  if (!errCode) {
    return 'An unexpected error.'
  }

  let msg = ERR_MSG[errCode]
  if (!msg) {
    msg = errCode.replace(/_/g, ' ') + ' Error.'
  }
  return msg
}

// function errorMessage (errCode, serverMessage) {
//   if (!errCode) {
//     return 'An unexpected error.'
//   }

//   if (!serverMessage) {
//     serverMessage = errCode.replace(/_/g, ' ') + ' Error.'
//   }
//   return serverMessage
// }
