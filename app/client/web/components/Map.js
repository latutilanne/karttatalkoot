import React from "react"
import Kefir from "kefir"
import {Combinator} from "react-combinators/kefir"
import GoogleMapLoader from "react-google-maps/lib/GoogleMapLoader"
import GoogleMap from "react-google-maps/lib/GoogleMap"
import {stateless} from "client/components"

import {latLng} from "client/web/util/mapUtils"
import MapContents from "./MapContents"

/*global google*/

export default stateless(({model}) =>
  <div className="full-screen">
    <GoogleMapLoader
      containerElement={<div className="full-screen"></div>}
      googleMapElement={withObservables(Map(model))}
    />
  </div>
)

// ATTENTION: DO NOT place observables into GoogMap props!
// children are ok though
const Map = model => {
  const pool = Kefir.pool()
  const map = pool.filter(m => !!m).take(1).toProperty()

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.SMALL
    }
  }

  return (
    <GoogleMap
      ref={m => pool.plug(Kefir.constant(m))}
      options={mapOptions}
      defaultZoom={5}
      defaultCenter={latLng({lat: 64.24459, lon: 26.36718})}>
      {MapContents(map, model)}
    </GoogleMap>
  )
}

const withObservables = MapComponent => {
  const {children, ...mapProps} = MapComponent.props
  const ObsMap = ({map, containerTagName}) =>
    <Combinator>
      {React.cloneElement(MapComponent, {map, containerTagName})}
    </Combinator>

  return <ObsMap {...mapProps} />
}
