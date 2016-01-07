import React from "react"
import {resolve} from "path"
import {readFileSync} from "fs"
import md5 from "md5"

const cssHash =
  md5(readFileSync(resolve(__dirname, "../public/bundle.css")).toString())

const jsHash =
  md5(readFileSync(resolve(__dirname, "../public/bundle.js")).toString())


export default ({initialState, gmapsApiKey}) =>
  <html>
    <head>
      <title>Karttatalkoot - latu-urat yhdessä kartalle!</title>
      <link rel="stylesheet" href={`/public/bundle.css?hash=${cssHash}`}/>
      <link rel="icon" type="image/png" href="/public/favicon.png"/>
    </head>
    <body>
      <div id="app" data-initial-state={JSON.stringify(initialState)}></div>
      <script type="text/javascript" src={"https://maps.googleapis.com/maps/api/js?key=" + gmapsApiKey}></script>
      <script type="text/javascript" src={`/public/bundle.js?hash=${jsHash}`}></script>
    </body>
  </html>
