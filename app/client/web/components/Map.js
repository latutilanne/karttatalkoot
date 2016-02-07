import React from "react"
import Kefir from "kefir"
import atom from "kefir.atom"
import R from "react.reactive"
import GoogleMapLoader from "react-google-maps/lib/GoogleMapLoader"
import GoogleMap from "react-google-maps/lib/GoogleMap"
import MapContents from "./MapContents"
import {latLng} from "client/web/util/mapUtils"


/*global google*/

const RGoogleMap = R(GoogleMap)
const { ControlPosition, ZoomControlStyle } = google.maps


export default ({model}) => {
  const map = atom()

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: ControlPosition.LEFT_BOTTOM,
      style: ZoomControlStyle.SMALL
    }
  }

  const MapContainer =
    <div className="full-screen"></div>

  const MapElem =
    <RGoogleMap
      onMount={map.set}
      options={mapOptions}
      defaultZoom={5}
      defaultCenter={latLng({lat: 64.24459, lon: 26.36718})}>
      {MapContents(map.toProperty(), model).merge(Kefir.constant([]))}
    </RGoogleMap>

  return (
    <div className="full-screen">
      <GoogleMapLoader
        containerElement={MapContainer}
        googleMapElement={MapElem}
      />
    </div>
  )
}
