import React from "react"
import Kefir from "kefir"
import {partial, concat, isEqual} from "lodash"
import Marker from "react-google-maps/lib/Marker"
import Polyline from "react-google-maps/lib/Polyline"
import {loadWays} from "client/osm"
import {latLng, mapBoundsAsBB} from "client/web/util/mapUtils"


/*global google*/

export default (map, {tracks, selectTrack}) => {
  const asMarkers = tracks =>
    tracks.map(t => (
      <Marker
        key={t.id}
        position={latLng(t.location)}
        title={t.name}
        icon={markerIcon(t)}
        onClick={partial(selectTrack, t.id)}
      />
    ))

  const asPolyLines = ways =>
    ways.map(way => (
      <Polyline
        key={way.id}
        path={way.nodes.map(latLng)}
        />
    ))
  const markers =
    tracks.map(asMarkers)


  const mapBoundChanges =
    Kefir.merge([observeMapEvent(map, "zoom_changed"), observeMapEvent(map, "center_changed")])

  const lines =
    mapBoundChanges
      .debounce(1000)
      .map(m => ({
        zoom: m.getZoom(),
        bb: m.getBounds() ? mapBoundsAsBB(m.getBounds()) : null
      }))
      .flatMapLatest(({zoom, bb}) => !bb || zoom < 11 ? Kefir.constant([]) : loadWays(bb))
      .skipDuplicates(isEqual)
      .map(asPolyLines)


  // TODO: trail and track drawing logic here
  return Kefir.combine([lines, markers]).map(concat)
}



const markerIcon = () => ({
  url: "/public/images/marker.png",
  size: new google.maps.Size(20, 25),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(10, 25)
})


const observeEvent = (obj, eventName) => Kefir.stream(emitter => {
  const listener =
    google.maps.event.addListener(obj, eventName, ev => emitter.emit(ev))
  return () => google.maps.event.removeListener(listener)
})

const observeMapEvent = (map, eventName) =>
  map.flatMapLatest(m => Kefir.constant(m).merge(observeEvent(m, eventName)).map(() => m))
