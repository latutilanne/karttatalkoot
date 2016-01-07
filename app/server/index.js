import React from "react"
import {renderToStaticMarkup} from "react-dom/server"
import startServer from "./util/startServer"

import IndexPage from "IndexPage"


export default ctx => {
  startServer(app => {
    app.get("/", (req, res) => {
      const initialState = { }
      const html =
        "<!DOCTYPE html>\n" +
        renderToStaticMarkup(
          <IndexPage
            initialState={initialState}
            gmapsApiKey={ctx.GMAPS_API_KEY}
          />
        )

      res.set("Content-Type", "text/html")
      res.send(html)
    })
  })
}
