import {partial} from "ramda"
import {latLng} from "client/web/util/mapUtils"


/*global google*/

const { Size, Point, Marker } = google.maps

const markerIcon = () => ({
  url: "/public/images/marker.png",
  size: new Size(20, 25),
  origin: new Point(0, 0),
  anchor: new Point(10, 25)
})

const trackAsMarker = (selectTrack, track) => {
  const m = new Marker({
    position: latLng(track.location),
    title: track.name,
    icon: markerIcon(track)
  })
  m.addListener("click", partial(selectTrack, [track.id]))
  m.getTrack = () => track
  return m
}

export default (googleMap, model) => {
  const { selectTrack } = model
  const markersById = {}
  const updateMarkers = tracks => {
    // add new
    tracks
      .filter(t => !markersById[t.id])
      .map(partial(trackAsMarker, [selectTrack]))
      .forEach(m => {
        m.setMap(googleMap)
        markersById[m.getTrack().id] = m
      })

    // TODO: update existing
  }

  model.tracks.onValue(updateMarkers)
  return () => model.tracks.offValue(updateMarkers)
}
