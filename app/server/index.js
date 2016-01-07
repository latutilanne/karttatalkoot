import startServer from "./util/startServer"
import initWebsite from "./routes/website"
import initAPI from "./routes/api"

export default ctx => {
  startServer(app => {
    initWebsite(ctx, app)
    initAPI(ctx, app)
  })
}
