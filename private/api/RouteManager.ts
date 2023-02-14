import * as path from 'path'
import * as express from 'express'
import { v4 } from 'uuid'

import { StatusCodes as HttpStatusCode } from 'http-status-codes'

import { readHtmlFile } from './util/readHtmlFile'

import { ServerRoute } from '@enum/ServerRoute'

export class RouteManager {
  public router: express.Router

  private rootPath: string

  private drivers = [
    { id: '2b6739e1-e3e8-4bcc-bd8f-e1a0d54c125c', name: 'John Doe', location: 'Berlin' },
    { id: '7647846f-4ef3-4517-af3a-cf21ecfe28b0', name: 'Duc Hoang', location: 'Mannheim' },
    {
      id: 'c0a16f0e-19d3-4436-be34-1b50813f949a',
      name: 'Dennis Jantos',
      location: 'Stuttgart',
    },
    {
      id: '4a9a0740-10fc-4dbf-b975-175dc0eeade5',
      name: 'Norah Jones',
      location: 'Hamburg',
    }
  ]

  private tours = [
    {
      id: '55c76fbd-7ef4-41eb-a6fc-d0c3f0e250c0',
      customerName: 'Great Company',
      shipmentDate: '01.01.2022',
      locationFrom: 'Berlin',
      locationTo: 'Hamburg',
      assignedDriver: 'John Doe',
    }
  ]

  constructor() {
    this.rootPath = path.join(__dirname, '..', '..')
    this.router = express.Router()

    this.configureStaticContent()
    this.configureRoutes()
  }

  private configureStaticContent(): void {
    this.router.use('/root/dist', express.static(path.join(this.rootPath, 'dist')))
  }

  private configureRoutes(): void {
    this.router.get(
      ServerRoute.Index,
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const indexPath = path.join(this.rootPath, 'dist', 'index.html')
        try {
          const index = await readHtmlFile(indexPath)
          res.send(index)
        } catch (error: any) {
          return next(error)
        }
      }
    )

    this.router.get(ServerRoute.Health, (req: express.Request, res: express.Response) =>
      res.sendStatus(HttpStatusCode.OK)
    )

    this.router.get(ServerRoute.Driver, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.send({ drivers: this.drivers })
      return next()
    })

    this.router.get(`${ServerRoute.Driver}/:id`, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const id = req.params.id
      const driver = this.drivers.find(driver => driver.id === id)
      res.send({ driver })
      return next()
    })

    this.router.post(ServerRoute.Driver, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const id = v4()
      const { name, location } = req.body
      this.drivers.push({ id, name, location })
      res.sendStatus(HttpStatusCode.CREATED)
      return next()
    })

    this.router.put(`${ServerRoute.Driver}/:id`, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const id = req.params.id
      const { name, location } = req.body
      this.drivers = this.drivers.map(driver => {
        if (driver.id !== id) return driver
        return {
          id,
          name,
          location
        }
      })
      res.sendStatus(HttpStatusCode.NO_CONTENT)
      return next()
    })

    this.router.delete(`${ServerRoute.Driver}/:id`, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const id = req.params.id
      this.drivers = this.drivers.filter(driver => driver.id !== id)
      res.sendStatus(HttpStatusCode.NO_CONTENT)
      return next()
    })

    this.router.get(ServerRoute.Tour, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.send({ tours: this.tours })
      return next()
    })

    this.router.get(`${ServerRoute.Tour}/:id`, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const id = req.params.id
      const tour = this.tours.find(tour => tour.id === id)
      res.send({ tour })
      return next()
    })

    this.router.post(ServerRoute.Tour, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const id = v4()
      const {
        customerName,
        shipmentDate,
        locationFrom,
        locationTo,
        assignedDriver
      } = req.body
      this.tours.push({ id, customerName, shipmentDate, locationFrom, locationTo, assignedDriver })
      res.sendStatus(HttpStatusCode.CREATED)
      return next()
    })

    this.router.put(`${ServerRoute.Tour}/:id`, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const id = req.params.id
      const {
        customerName,
        shipmentDate,
        locationFrom,
        locationTo,
        assignedDriver
      } = req.body
      this.tours = this.tours.map(tour => {
        if (tour.id !== id) return tour
        return {
          id,
          customerName,
          shipmentDate,
          locationFrom,
          locationTo,
          assignedDriver
        }
      })
      res.sendStatus(HttpStatusCode.NO_CONTENT)
      return next()
    })

    this.router.delete(`${ServerRoute.Tour}/:id`, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const id = req.params.id
      this.tours = this.tours.filter(tour => tour.id !== id)
      res.sendStatus(HttpStatusCode.NO_CONTENT)
      return next()
    })
  }
}
