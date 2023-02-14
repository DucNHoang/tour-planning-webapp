import axios from 'axios'

import { ServerRoute } from '@enum/ServerRoute'
import { Driver } from '@type/Driver'

export class DriverService {

  public static async getAllDrivers(): Promise<Driver[]> {
    const response = await axios.get(ServerRoute.Driver)
    const { drivers } = response.data as { drivers: Driver[] }
    return drivers
  }

  public static async getDriverById(driverId: string): Promise<Driver> {
    const response = await axios.get(`${ServerRoute.Driver}/${driverId}`)
    const { driver } = response.data as { driver: Driver }
    return driver
  }

  public static async saveNewDriver(newDriver: Omit<Driver, 'id'>): Promise<void> {
    await axios.post(ServerRoute.Driver, newDriver)
  }

  public static async updateDriver(driverId: string, updatedDriver: Omit<Driver, 'id'> | null): Promise<void> {
    await axios.put(`${ServerRoute.Driver}/${driverId}`, updatedDriver)
  }

  public static async deleteDriver(driverId: string): Promise<void> {
    await axios.delete(`${ServerRoute.Driver}/${driverId}`)
  }
}
