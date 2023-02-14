import * as util from 'util'
import * as express from 'express'

import { RouteManager } from './api/RouteManager'

export class Server {
  private app: express.Application
  private router: express.Router

  constructor() {
    this.app = express()
    this.router = new RouteManager().router
    this.setupApp()
    this.setupRoutes()
  }

  public async start(): Promise<number> {
    // Webpack is used in local development for hot reloading
    await this.useWebpackMiddleware()

    const port = 10000
    const listenAsync = util.promisify((port, callback) => this.app.listen(port, callback))
    await listenAsync(port)

    return port
  }

  private setupApp(): void {
    this.app.use(express.json())
  }

  private setupRoutes(): void {
    this.app.use(this.router)
  }

  private async useWebpackMiddleware(): Promise<void> {
    // Only required in development
    // Importing at the top means the live container installs
    // the modules and copies the webpack config unnecessarily
    const webpack = await import('webpack')
    const webpackDevMiddleware = await import('webpack-dev-middleware')
    const webpackConfig = await import('../webpack.config.js')

    const middlewareOptions = {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true },
    }
    this.app.use(webpackDevMiddleware(webpack(webpackConfig), middlewareOptions))
  }
}
