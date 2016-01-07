import React from "react"
import {stateless} from "client/components"

export default stateless(({model}) =>
  <div>
    <h1 className="title">Node.js quickstart</h1>
    <p className="author">
      By {model.lens("author")}
    </p>
  </div>
)
