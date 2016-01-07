import React from "react"
import Marker from "react-google-maps/lib/Marker"
import {latLng} from "client/web/util/mapUtils"

/* global: google */

export default (map, {tracks}) => {
  // TODO: trail and track drawing logic here
  return tracks.map(tracks => tracks.map(t => (
    <Marker
      key={t.id}
      position={latLng(t.location)}
      title={t.name}
      icon={markerIcon(t)}
    />
  )))
}


const markerIcon = () => ({
  url: "/public/images/marker.png",
  size: new google.maps.Size(20, 25),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(10, 25)
})
