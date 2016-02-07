import {curry} from "ramda"

export const store = curry((key, val) => {
  try {
    localStorage.setItem(`karttatalkoot:${key}`, JSON.stringify({val}))
  } catch (ignore) {
  }
})

export const load = (key, defaultValue) => {
  try {
    const item = localStorage[`karttatalkoot:${key}`]
    return item ? JSON.parse(item).val : defaultValue
  } catch (ignore) {
    return defaultValue
  }
}
