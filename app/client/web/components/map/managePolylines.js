import Kefir from "kefir"
import {indexBy, prop, partial} from "ramda"
import {latLng, observeMapEvent, mapBoundsAsBB} from "client/web/util/mapUtils"
import {loadWays} from "client/osm"

/*global google*/

const {Polyline} = google.maps

const lineOptions = selected => ({
  strokeColor: selected ? "#4169E1" : "#00BFFF",
  strokeOpacity: selected ? .7 : .5,
  strokeWeight: 2
})

const wayAsPolyline = (toggleSelected, way) => {
  const line = new Polyline({
    path: way.nodes.map(latLng),
    ...lineOptions(way.selected)
  })
  line.addListener("click", partial(toggleSelected, [way]))
  line.getWay = () => way
  return line
}

export default (googleMap, model) => {  // eslint-disable-line
  const linesById = {}
  const updatePolylines = ways => {
    // add new
    ways
      .filter(w => !linesById[w.id])
      .map(partial(wayAsPolyline, [model.toggleWaySelected]))
      .forEach(line => {
        line.setMap(googleMap)
        linesById[line.getWay().id] = line
      })

    // update existing
    ways
      .filter(w => linesById[w.id])
      .map(way => ({line: linesById[way.id], way}))
      .forEach(({line, way}) => {
        // TODO: better diff
        const prev = line.getWay()
        if (prev.selected !== way.selected) {
          line.setOptions(lineOptions(way.selected))
        }
        line.getWay = () => way
      })

    // TODO: do we need to remove anything?
  }

  const mapBoundChanges =
    Kefir.merge([
      observeMapEvent(googleMap, "zoom_changed"),
      observeMapEvent(googleMap, "center_changed")
    ])

  const addedWays =
    model.editedTrail.map(t => t ? t.ways : [])

  const ways =
    mapBoundChanges
      .merge(Kefir.later(0, googleMap))   // initial load
      .debounce(1000)
      .map(map => ({
        zoom: map.getZoom(),
        bb: map.getBounds() ? mapBoundsAsBB(map.getBounds()) : null
      }))
      .flatMapLatest(({zoom, bb}) => !bb || zoom < 11 ? Kefir.constant([]) : loadWays(bb))
      .combine(addedWays, (ways, added) => {
        const addedById = indexBy(prop("id"), added)
        return ways.map(way => ({
          ...way,
          selected: !!addedById[way.id]
        }))
      })

  ways.onValue(updatePolylines)
  return () => ways.offValue(updatePolylines)
}

