import React from "react"
import {render} from "react-dom"
import model from "client/model"
import App from "./App"

const $app =
  document.getElementById("app")

const initialState =
  JSON.parse($app.getAttribute("data-initial-state"))

render(<App model={model(initialState)} />, $app)
