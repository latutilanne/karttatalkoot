import Kefir from "kefir"
import atom from "kefir.atom"
import {lensProp, find, prop, equals, compose, always, identity} from "ramda"
import {loadTracks} from "./api"

const idEq = id => compose(equals(id), prop("id"))

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
  const selectedTrackId =
    model.lens(lensProp("selectedTrackId"))

  const selectedTrack =
    Kefir.combine([tracks, selectedTrackId])
      .map(([tracks, id]) => find(compose(equals(id), prop("id")), tracks))
      .skipDuplicates()
      .toProperty()

  const selectTrack = id => {
    selectedTrackId.set(id)
  }



  // trail under edit (cached in memory until saved to ladut.fi server)
  const editedTrail =
    model.lens(lensProp("editedTrail"))

  // deselecting track resets edited trail
  editedTrail.plug(selectedTrack.filter(t => !t).map(always(undefined)).map(always).delay(1))

  const startEditingTrail = id => {
    editedTrail.set({id, ways: []})
  }

  const saveEditedTrail = () => {
    // TODO: save to server
    console.log("saved")
    editedTrail.set(undefined)
  }

  const cancelEditedTrail = () => {
    console.log("cancel")
    editedTrail.set(undefined)
  }

  const toggleWaySelected = way => {
    editedTrail.modify(trail => trail && {
      ...trail,
      ways: find(idEq(way.id), trail.ways) ? trail.ways.filter(w => w.id !== way.id)
        : [...trail.ways, way]
    })
  }




  if (process.env.NODE_ENV !== "production") {
    model.log("MODEL")
  }

  return {
    // props
    tracks,
    selectedTrack,
    editedTrail,

    // methods
    selectTrack,
    startEditingTrail,
    toggleWaySelected,
    saveEditedTrail,
    cancelEditedTrail
  }
}
