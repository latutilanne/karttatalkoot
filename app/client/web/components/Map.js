import React from "react"
import GoogleMapLoader from "react-google-maps/lib/GoogleMapLoader"
import GoogleMap from "react-google-maps/lib/GoogleMap"
import {latLng, latLon} from "client/web/util/mapUtils"
import {load, store} from "client/web/util/localStorage"

import manageMarkers from "./map/manageMarkers"
import managePolyLines from "./map/managePolylines"

/*global google*/

const { ControlPosition, ZoomControlStyle } = google.maps


export default React.createClass({

  // we are using constant observable model so no need to re-render
  // after initial map render
  shouldComponentUpdate() {
    return false
  },

  componentWillUnmount() {
    this.state.disposables.forEach(d => d.call())
  },

  startManagingMap({props: {map}}) {
    const {model} = this.props
    this.setState({
      map,
      disposables: [
        manageMarkers(map, model),
        managePolyLines(map, model)
      ]
    })
  },

  handleZoomChange() {
    store("map:zoom", this.state.map.getZoom())
  },

  handleCenterChange() {
    store("map:center", latLon(this.state.map.getCenter()))
  },

  render() {
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
      <GoogleMap
        ref={this.startManagingMap}
        options={mapOptions}
        defaultZoom={load("map:zoom", 5)}
        defaultCenter={latLng(load("map:center", {lat: 64.24459, lon: 26.36718}))}
        onZoomChanged={this.handleZoomChange}
        onCenterChanged={this.handleCenterChange}
      />

    return (
      <div className="full-screen">
        <GoogleMapLoader
          containerElement={MapContainer}
          googleMapElement={MapElem}
        />
      </div>
    )
  }
})
