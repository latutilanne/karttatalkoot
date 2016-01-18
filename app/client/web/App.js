import React from "react"
import {stateless} from "client/components"

import Map from "./components/Map"
import TrackInfo from "./components/TrackInfo"


export default stateless(({model}) =>
  <div className="full-screen">
    <Map model={model} />
    <TrackInfo model={model} />
  </div>
)
