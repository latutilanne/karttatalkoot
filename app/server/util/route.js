import routes from "promised-routes"
import {error} from "./logger"

export default routes.configure({
  errorHandler(res, e) {
    if (e.stack) {
      error(e)
    }
    res.status(e.status || 500)
    if (e.html) {
      res.set("Content-Type", "text/html")
      res.send(e.html)
    } else if (e.json) {
      res.json(e.json)
    } else {
      res.send({msg: e.msg || "Error"})
    }
  }
})
