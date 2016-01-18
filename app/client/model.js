import Model from "kefir-model"
import _ from "lodash"
import {dispatch, observe} from "./dispatcher"
import {loadTracks} from "./api"


export default initial => {
  const withDefaults = {
    tracks: [],
    ...initial
  }

  // methods
  const selectTrack = id =>
    dispatch("track:select", id)


  const model =
    Model(withDefaults)

  // props
  const tracks =
    model.lens("tracks")

  const selectedTrack =
    model.lens("selectedTrack")


  tracks.plug(loadTracks())

  selectedTrack.plug(
    tracks.sampledBy(observe("track:select"), (tracks, id) => _.find(tracks, {id}))
  )


  return {
    // props
    tracks,
    selectedTrack,

    // methods
    selectTrack
  }
}
