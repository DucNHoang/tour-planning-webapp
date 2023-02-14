<template>
  <transition name="modal">
    <div class="modal-overlay">
      <div v-if="dataIsReady" class="modal-content">
        <div class="modal-header">
          <h3>Update Tour</h3>
          <button @click="$emit('modalClosed')">&times;</button>
        </div>
        <div class="modal-body">
          <!-- Add input forms here -->
          <FreeTextInputVue
            v-model="updatedTour.customerName"
            label="Customer name"
          />
          <FreeTextInputVue
            v-model="updatedTour.shipmentDate"
            label="Shipment date"
          />
          <FreeTextInputVue
            v-model="updatedTour.locationFrom"
            label="Location from"
          />
          <FreeTextInputVue
            v-model="updatedTour.locationTo"
            label="Location to"
          />
          <div class="input-container">
            <label for="select">Assigned driver:</label>
            <select v-model="selectedDriverId">
              <option v-for="driver in drivers" :value="driver.id">
                {{ driver.name }} - {{ driver.location }}
              </option>
            </select>
          </div>
        </div>
        <ul>
          <li v-for="message in feedbackMessages" :key="message">
            {{ message }}
          </li>
        </ul>
        <div class="modal-footer">
          <button
            class="button"
            :disabled="feedbackMessages.length > 0"
            @click="updateTour"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { cloneDeep, isNil } from 'lodash'

import { DriverService } from 'public/services/DriverService'
import { TourService } from 'public/services/TourService'

import FreeTextInputVue from '../input/FreeTextInput.vue'

import { containsNumber } from '../../helpers/containsNumber'

import { Tour } from '@type/Tour'
import { Driver } from '@type/Driver'

type ComponentData = {
  updatedTour: Omit<Tour, 'id'> | null
  drivers: Driver[]
  selectedDriverId: string | null
}

export default {
  components: {
    FreeTextInputVue,
  },
  props: {
    tourId: {
      type: String,
      default: '',
    },
  },
  data(): ComponentData {
    return {
      updatedTour: null,
      drivers: [],
      selectedDriverId: null,
    }
  },
  computed: {
    assignedDriver(): string {
      const assignedDriverName = this.drivers.find(
        (driver) => driver.id === this.selectedDriverId
      )?.name
      if (isNil(assignedDriverName)) return ''
      return assignedDriverName
    },
    feedbackMessages(): string[] {
      const array: string[] = []
      if (this.updatedTour === null) return array
      const { customerName, shipmentDate, locationFrom, locationTo } =
        this.updatedTour
      if (
        customerName === '' ||
        shipmentDate === '' ||
        locationFrom === '' ||
        locationTo === '' ||
        this.assignedDriver === ''
      )
        array.push('No field can be empty.')
      if (containsNumber(locationFrom))
        array.push('"Location from" cannot contain any number.')
      if (containsNumber(locationTo))
        array.push('"Location to" cannot contain any number.')

      if (
        locationFrom !== '' &&
        this.selectedDriverId !== null &&
        this.selectedDriverId !== ''
      ) {
        const selectedDriverLocation = this.drivers.find(
          (driver) => driver.id === this.selectedDriverId
        )?.location
        if (selectedDriverLocation !== locationFrom)
          array.push('Driver\'s location does not match "Location from."')
      }
      return array
    },
    dataIsReady(): boolean {
      return this.updatedTour !== null
    },
  },
  async created(): Promise<void> {
    try {
      const drivers = await DriverService.getAllDrivers()
      this.drivers = drivers

      const tour = await TourService.getTourById(this.tourId)
      this.selectedDriverId =
        this.drivers.find((driver) => driver.name === tour.assignedDriver)
          ?.id ?? null
      this.updatedTour = {
        customerName: tour.customerName,
        shipmentDate: tour.shipmentDate,
        locationFrom: tour.locationFrom,
        locationTo: tour.locationTo,
        assignedDriver: tour.assignedDriver,
      }
    } catch (error) {
      alert('Something went wrong. Please try again.')
      console.log(error)
    }
  },
  methods: {
    async updateTour(): Promise<void> {
      try {
        const updatedTour = cloneDeep(this.updatedTour)

        if (isNil(updatedTour))
          throw new Error('updatedTour object is null or undefined.')

        updatedTour.assignedDriver = this.assignedDriver
        await TourService.updateTour(this.tourId, updatedTour)
        this.$emit('tourUpdated')
      } catch (error) {
        alert('Something went wrong. Please try again.')
        console.log(error)
      } finally {
        this.$emit('modalClosed')
        this.updatedTour = null
        this.selectedDriverId = null
      }
    },
  },
}
</script>
