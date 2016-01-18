import superagent from "superagent"
import Kefir from "kefir"


export const loadTracks = () =>
  get("/api/tracks")

export const loadWays = bb =>
  get("/api/ways", bb)

const get = (url, queryParams = {}) => {
  const req =
    superagent
      .get(url)
      .set("Accept", "application/json")
      .query(queryParams)

  return Kefir.fromNodeCallback(req.end.bind(req))
    .flatMapFirst(res => isOk(res.statusCode) ? Kefir.constant(res.body) : Kefir.constantError(res.body))

}

const isOk = status =>
  status === 200 || status === 201
