import React from "react"

import Map from "./components/Map"
import TrackInfo from "./components/TrackInfo"


export default ({model}) =>
  <div className="full-screen">
    <Map model={model} />
    <TrackInfo model={model} />
  </div>
