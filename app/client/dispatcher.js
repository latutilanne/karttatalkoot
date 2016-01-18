import Kefir from "kefir"
import _ from "lodash"

/**
 * Global dispatcher module that supports two operations:
 *  - dispatch : dispatch some action type and its data to observers
 *  - observe : observe the given action type (returns events stream with action data)
 */

let emitter
const stream = Kefir.stream(em => {
  emitter = em
  return () => emitter = null
})

export const dispatch = _.curry((action, data) => {
  emitter && emitter.emit({action, data})
})

export const dispatchConst = (action, data) => () => {
  emitter && emitter.emit({action, data})
}

export const observe = action =>
  stream.filter(a => a.action === action).map(a => a.data)
