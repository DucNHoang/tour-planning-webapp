<template>
  <transition name="modal">
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add Tour</h3>
          <button @click="$emit('modalClosed')">&times;</button>
        </div>
        <div class="modal-body">
          <!-- Add input forms here -->
          <FreeTextInputVue v-model="newTour.customerName" label="Customer name" />
          <FreeTextInputVue v-model="newTour.shipmentDate" label="Shipment date" />
          <FreeTextInputVue v-model="newTour.locationFrom" label="Location from" />
          <FreeTextInputVue v-model="newTour.locationTo" label="Location to" />
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
            @click="saveTour"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import axios from 'axios'
import { cloneDeep, isNil } from 'lodash'

import { ServerRoute } from '@enum/ServerRoute'
import { Tour } from '@type/Tour'
import { Driver } from '@type/Driver'

import FreeTextInputVue from '../input/FreeTextInput.vue'

import { containsNumber } from '../../helpers/containsNumber'

type ComponentData = {
  newTour: Omit<Tour, 'id'>
  drivers: Driver[]
  selectedDriverId: string | null
}

export default {
  components: {
    FreeTextInputVue,
  },
  data(): ComponentData {
    return {
      newTour: {
        customerName: '',
        shipmentDate: '',
        locationFrom: '',
        locationTo: '',
        assignedDriver: '',
      },
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
      const { customerName, shipmentDate, locationFrom, locationTo } =
        this.newTour
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
  },
  async created(): Promise<void> {
    try {
      const uri = ServerRoute.Driver
      const response = await axios.get(uri)
      const { drivers } = response.data
      this.drivers = drivers
      return
    } catch (error) {
      alert('Something went wrong. Please try again.')
      console.log(error)
    }
  },
  methods: {
    async saveTour(): Promise<void> {
      try {
        const newTour = cloneDeep(this.newTour)
        newTour.assignedDriver = this.assignedDriver
        const uri = ServerRoute.Tour
        await axios.post(uri, newTour)
        this.$emit('newTourAdded')
      } catch (error) {
        alert('Something went wrong. Please try again.')
        console.log(error)
      } finally {
        this.$emit('modalClosed')
        this.newTour.customerName = ''
        this.newTour.shipmentDate = ''
        this.newTour.locationFrom = ''
        this.newTour.locationTo = ''
        this.newTour.assignedDriver = ''
      }
    },
  },
}
</script>
