import React from "react"
import Kefir from "kefir"
import atom from "kefir.atom"
import R from "react.reactive"
import GoogleMapLoader from "react-google-maps/lib/GoogleMapLoader"
import GoogleMap from "react-google-maps/lib/GoogleMap"
import MapContents from "./MapContents"
import {latLng, latLon} from "client/web/util/mapUtils"
import {load, store} from "client/web/util/localStorage"

/*global google*/

const RGoogleMap = R(GoogleMap)
const { ControlPosition, ZoomControlStyle } = google.maps


export default ({model}) => {
  const mapAtom = atom()
  const googleMap =
    mapAtom.map(m => m.props.map).toProperty()

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
      onMount={mapAtom.set}
      options={mapOptions}
      defaultZoom={load("map:zoom", 5)}
      defaultCenter={latLng(load("map:center", {lat: 64.24459, lon: 26.36718}))}
      onZoomChanged={() => store("map:zoom", mapAtom.get().getZoom())}
      onCenterChanged={() => store("map:center", latLon(mapAtom.get().getCenter()))}>
      {MapContents(googleMap, model).merge(Kefir.constant([]))}
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
