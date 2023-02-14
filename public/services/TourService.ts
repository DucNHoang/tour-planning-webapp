import axios from 'axios'

import { ServerRoute } from '@enum/ServerRoute'
import { Tour } from '@type/Tour'

export class TourService {
  public static async getAllTours(): Promise<Tour[]> {
    const response = await axios.get(ServerRoute.Tour)
    const { tours } = response.data as { tours: Tour[] }
    return tours
  }

  public static async getTourById(tourId: string): Promise<Omit<Tour, 'id'>> {
    const response = await axios.get(`${ServerRoute.Tour}/${tourId}`)
    const { tour } = response.data as { tour: Tour }
    return {
      customerName: tour.customerName,
      shipmentDate: tour.shipmentDate,
      locationFrom: tour.locationFrom,
      locationTo: tour.locationTo,
      assignedDriver: tour.assignedDriver,
    }
  }

  public static async saveNewTour(newTour: Omit<Tour, 'id'>): Promise<void> {
    await axios.post(ServerRoute.Tour, newTour)
  }

  public static async updateTour(tourId: string, updatedTour: Omit<Tour, 'id'>): Promise<void> {
    await axios.put(`${ServerRoute.Tour}/${tourId}`, updatedTour)
  }

  public static async deleteTour(tourId: string): Promise<void> {
    await axios.delete(`${ServerRoute.Tour}/${tourId}`)
  }
}
