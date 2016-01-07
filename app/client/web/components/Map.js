import React from "react"
import GoogleMapLoader from "react-google-maps/lib/GoogleMapLoader"
import GoogleMap from "react-google-maps/lib/GoogleMap"
import {stateless} from "client/components"


const Map = model =>    // eslint-disable-line
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{lat: 64.24459, lng: 26.36718}}
  >
  </GoogleMap>


export default stateless(model =>
  <div className="full-screen">
    <GoogleMapLoader
      containerElement={<div className="full-screen"></div>}
      googleMapElement={Map(model)}
    />
  </div>
)

