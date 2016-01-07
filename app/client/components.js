import React from "react"
import _ from "lodash"
import {Combinator} from "react-combinators/kefir"

export const stateless = render => props =>
  <Combinator>
    {render(props)}
  </Combinator>


export const stateful = render => {
  const firstRender = _.once(render)
  return props =>
    <Combinator>
      {firstRender(props)}
    </Combinator>
}
