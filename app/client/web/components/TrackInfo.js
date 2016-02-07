import React from "react"
import Kefir from "kefir"
import R from "react.reactive"
import {partial} from "ramda"

export default ({model}) => {
  const {
    selectedTrack,
    editedTrail,
    selectTrack,
    startEditingTrail,
    saveEditedTrail,
    cancelEditedTrail
    } = model

  const trackInfoClassName =
    selectedTrack
      .map(t => "track-info " + (t ? "open" : "hidden"))
      .toProperty()

  const closeTrack = partial(selectTrack, [ undefined ])

  const trailClass = ({id}) =>
    editedTrail.map(t => t && t.id === id ? "edited" : "")

  return (
    <R.div className={trackInfoClassName}>
      {selectedTrack.flatMapLatest(withAnimation(({name, city, trails}) =>
        <div>
          <h2>{name}</h2>
          <h3>{city}</h3>

          <h4>Radat</h4>
          <ul className="trails">
            {trails.map(trail => (
              <R.li key={trail.id} className={trailClass(trail)}>
                {trail.name}
                <button className="edit" onClick={partial(startEditingTrail, [trail.id])}>
                  Editoi
                </button>
                <button className="save" onClick={partial(saveEditedTrail, [])}>
                  Tallenna
                </button>
                <button className="cancel" onClick={partial(cancelEditedTrail, [])}>
                  Peruuta
                </button>
              </R.li>
            ))}
          </ul>
          <button className="close-btn" onClick={closeTrack}>
            Sulje
          </button>
        </div>
      ))}
    </R.div>
  )
}

// slide animation requires 500 ms so we can't destroy previous
// element before that
const withAnimation = render => track =>
  track ? Kefir.constant(render(track)) : Kefir.later(600, null)
