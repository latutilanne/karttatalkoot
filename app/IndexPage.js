import React from "react"
import {resolve} from "path"
import {readFileSync} from "fs"
import md5 from "md5"

const cssHash =
  md5(readFileSync(resolve(__dirname, "../public/bundle.css")).toString())

const jsHash =
  md5(readFileSync(resolve(__dirname, "../public/bundle.js")).toString())


export default ({initialState}) =>
  <html>
    <head>
      <title>Node quickstart</title>
      <link rel="stylesheet" href={`/public/bundle.css?hash=${cssHash}`}/>
    </head>
    <body>
      <div id="app" data-initial-state={JSON.stringify(initialState)}></div>
      <script type="text/javascript" src={`/public/bundle.js?hash=${jsHash}`}></script>
    </body>
  </html>
