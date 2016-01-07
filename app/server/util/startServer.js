import express from "express"
import {resolve} from "path"
import compression from "compression"
import serveStatic from "serve-static"
import bodyParser from "body-parser"
import {info} from "./logger"

export default (initFn) => {
  const app = express()

  app.use(bodyParser.json())
  app.use(compression())
  app.use("/public", serveStatic(resolve(__dirname, "../../../public"), {
    setHeaders(res) {
      const control = process.env.NODE_ENV === "production" ? "public, max-age=31536000" : "private, max-age=0, no-cache"
      res.set("Cache-Control", control)
    }
  }))

  initFn(app)

  const server = app.listen(process.env.PORT || 3000, () => {
    info("Server listening at port %s", server.address().port) // eslint-disable-line
  })
}

