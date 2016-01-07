import Kefir from "kefir"
import Model from "kefir-model"

export default initial => {
  const model = Model(initial)

  const author =
    model.lens("author")

  // add "!" every second
  author.plugModify(Kefir.interval(1000).map(() => str => str + "!"))

  return model
}


