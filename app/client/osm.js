import R from "ramda"
import * as api from "./api"

const typeEq = val =>
  R.pipe(R.prop("type"), R.equals(val))

const dataWithNodes = (nodesById, data) => R.pipe(
  R.filter(typeEq("way")),
  R.uniqBy(R.prop("id")),
  R.map(way => ({
    ...way,
    nodes: R.filter(R.identity, R.map(id => nodesById[id], way.nodes))
  })))(data)


export const loadWays = ({n, s, w, e}) => {
  return api.loadWays({n, e, s, w}).map(data => {
    const nodesById =
      R.indexBy(R.prop("id"), R.filter(typeEq("node"), data))
    
    return dataWithNodes(nodesById, data)
  })
}
