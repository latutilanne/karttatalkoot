import winston from "winston"

const logger = {
  debug(...args) {
    winston.log("debug", ...args)
  },
  info(...args) {
    winston.log("info", ...args)
  },
  warn(...args) {
    winston.log("warn", ...args)
  },
  error(...args) {
    winston.log("error", ...args)
  }
}


export default logger

export const debug = logger.debug

export const info = logger.info

export const warn = logger.warn

export const error = logger.error
