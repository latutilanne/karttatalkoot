import React from "react"
import Kefir from "kefir"
import _ from "lodash"
import {stateless} from "client/components"


export default stateless(({model}) => {
  const {selectedTrack, selectTrack} = model

  const trackInfoClassName =
    selectedTrack
      .map(t => "track-info " + (t ? "open" : "hidden"))
      .toProperty()


  const renderTrack = track => !track ? Kefir.later(600, null) : Kefir.constant(
    <div>
      <h2>{track.name}</h2>
      <h3>{track.city}</h3>

      <h4>Radat</h4>
      <ul className="trails">
        {track.trails.map(trail => (
          <li key={trail.id}>{trail.name}</li>
        ))}
      </ul>
      <button className="close-btn" onClick={_.partial(selectTrack, undefined)}>
        Sulje
      </button>
    </div>
  )

  return (
    <div className={trackInfoClassName}>
      {selectedTrack.flatMapLatest(renderTrack)}
    </div>
  )
})
