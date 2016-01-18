import _ from "lodash"
import * as api from "./api"

export const loadWays = ({n, s, w, e}) => {
  return api.loadWays({n, e, s, w}).map(data => {
    const nodesById =
      _(data)
        .filter({type: "node"})
        .indexBy("id")
        .valueOf()

    return _(data)
      .filter({type: "way"})
      .indexBy("id")
      .values()
      .map(way => ({...way, nodes: _.compact(_.map(way.nodes, id => nodesById[id]))}))
      .valueOf()
  })
}
