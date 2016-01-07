import request from "request"
import Promise from "bluebird"
import {pickAll} from "ramda"
import route from "server/util/route"

const preq = Promise.promisifyAll(request)

export default (ctx, app) => {
  const base = ctx.LADUTFI_API_ROOT

  app.get("/api/tracks", route.json(req =>
    preq.getAsync(`${base}/trails`)
      .get("body")
      .then(JSON.parse)
      .get("data")
      .map(pickAll(["id", "name", "city", "location", "trails"]))
  ))
}
