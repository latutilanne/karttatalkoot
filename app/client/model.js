import Model from "kefir-model"
import {loadTracks} from "./api"


export default initial => {
  const withDefaults = {
    tracks: [],
    ...initial
  }

  const model =
    Model(withDefaults)

  const tracks =
    model.lens("tracks")

  tracks.plug(loadTracks())

  return { tracks }
}
