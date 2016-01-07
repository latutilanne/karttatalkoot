import React from "react"
import {renderToString, renderToStaticMarkup} from "react-dom/server"
import startServer from "server/startServer"
import IndexPage from "./IndexPage"


startServer(app => {

  app.get("/", (req, res) => {
    const initialState = { author: "Matti Lankinen" }
    const html =
      "<!DOCTYPE html>\n" +
      renderToStaticMarkup(
        <IndexPage initialState={initialState} />
      )

    res.set("Content-Type", "text/html")
    res.send(html)
  })

})
