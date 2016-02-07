import Kefir from "kefir"
import atom from "kefir.atom"
import {lensProp, find, prop, equals, compose, always} from "ramda"
import {loadTracks} from "./api"


export default initialState => {
  const model = atom({
    tracks: [],
    ...initialState
  })

  // all tracks
  const tracks =
    model.lens(lensProp("tracks"))

  tracks.plug(loadTracks().map(always))


  // selected track
  const selectedTrackId = atom(null)
  const selectedTrack =
    Kefir.combine([tracks, selectedTrackId])
      .map(([tracks, id]) => find(compose(equals(id), prop("id")), tracks))
      .toProperty()



  return {
    // props
    tracks,
    selectedTrack,

    // methods
    selectTrack: selectedTrackId.set
  }
}
