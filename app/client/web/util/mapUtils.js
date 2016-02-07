
/*global google*/

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
