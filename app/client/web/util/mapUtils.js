import Kefir from "kefir"
import {always} from "ramda"

/*global google*/

const { addListener, removeListener } = google.maps.event


export const latLng = ({lat, lon}) =>
  new google.maps.LatLng(lat, lon)

export const latLon = (latLng) => ({
  lat: latLng.lat(),
  lon: latLng.lng()
})

export const mapBoundsAsBB = bounds => {
  const {east, north, south, west} = bounds.toJSON()
  return {
    n: north,
    s: south,
    e: east,
    w: west
  }
}


export const observeEvent = (obj, eventName) => Kefir.stream(emitter => {
  const listener = addListener(obj, eventName, ev => emitter.emit(ev))
  return () => removeListener(listener)
})

export const observeMapEvent = (map, eventName) =>
  observeEvent(map, eventName).map(always(map))
