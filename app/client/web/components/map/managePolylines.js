import Kefir from "kefir"
import {latLng, observeMapEvent, mapBoundsAsBB} from "client/web/util/mapUtils"
import {loadWays} from "client/osm"

/*global google*/

const {Polyline} = google.maps

const wayAsPolyline = way => {
  const line = new Polyline({
    path: way.nodes.map(latLng),
    strokeColor: "#00BFFF",
    strokeOpacity: .5,
    strokeWeight: 2
  })
  line.getWay = () => way
  return line
}

export default (googleMap, model) => {  // eslint-disable-line
  const linesById = {}
  const updatePolylines = ways => {
    // add new
    ways
      .filter(w => !linesById[w.id])
      .map(wayAsPolyline)
      .forEach(line => {
        line.setMap(googleMap)
        linesById[line.getWay().id] = line
      })

    // update existing
    ways
      .filter(w => linesById[w.id])
      .map(way => ({line: linesById[way.id], updated: way}))
      .forEach(({line, updated}) => { // eslint-disable-line
        // TODO: actual update logic somehow?
      })

    // TODO: do we need to remove anything?
  }

  const mapBoundChanges =
    Kefir.merge([
      observeMapEvent(googleMap, "zoom_changed"),
      observeMapEvent(googleMap, "center_changed")
    ])

  const ways =
    mapBoundChanges
      .merge(Kefir.later(0, googleMap))   // initial load
      .debounce(1000)
      .map(map => ({
        zoom: map.getZoom(),
        bb: map.getBounds() ? mapBoundsAsBB(map.getBounds()) : null
      }))
      .flatMapLatest(({zoom, bb}) => !bb || zoom < 11 ? Kefir.constant([]) : loadWays(bb))

  ways.onValue(updatePolylines)
  return () => ways.offValue(updatePolylines)
}

