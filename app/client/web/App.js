import React from "react"
import {stateless} from "client/components"

import Map from "./components/Map"


export default stateless(({model}) =>
  <div className="full-screen">
    <Map model={model} />
  </div>
)
