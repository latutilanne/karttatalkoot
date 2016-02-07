import request from "request"
import Promise from "bluebird"
import {pickAll} from "ramda"
import route from "server/util/route"

const preq = Promise.promisifyAll(request)

export default (ctx, app) => {
  const base = ctx.LADUTFI_API_ROOT

  app.get("/api/tracks", route.json(() =>
    preq.getAsync(`${base}/trails`)
      .get("body")
      .then(JSON.parse)
      .get("data")
      .map(pickAll(["id", "name", "city", "location", "trails"]))
  ))

  app.get("/api/ways", route.json(req =>
    preq
      .postAsync("http://overpass-api.de/api/interpreter", {form: {data: overpassQuery(BB(req.query))}})
      .get("body")
      .then(JSON.parse)
      .get("elements")
  ))

}


const BB = query =>
  `${query.s}, ${query.w}, ${query.n}, ${query.e}`

const overpassQuery = (bb) =>
  `[out:json];
   (
    node["piste:type"="nordic"](${bb});
    way["piste:type"="nordic"](${bb});
    relation["piste:type"="nordic"](${bb});
   );
   out body;
   >;
   out skel qt;
  `
