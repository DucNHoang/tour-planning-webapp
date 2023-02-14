<template>
  <transition name="modal">
    <div class="modal-overlay">
      <div v-if="dataIsReady" class="modal-content">
        <div class="modal-header">
          <h3>Are you sure?</h3>
          <button @click="$emit('modalClosed')">&times;</button>
        </div>
        <div class="modal-body">
          <!-- Add input forms here -->
          <FreeTextInputVue
            v-model="tour.customerName"
            :readonly="true"
            label="Customer name"
          />
          <FreeTextInputVue
            v-model="tour.shipmentDate"
            :readonly="true"
            label="Shipment date"
          />
          <FreeTextInputVue
            v-model="tour.locationFrom"
            :readonly="true"
            label="Location from"
          />
          <FreeTextInputVue
            v-model="tour.locationTo"
            :readonly="true"
            label="Location to"
          />
          <FreeTextInputVue
            v-model="tour.assignedDriver"
            :readonly="true"
            label="Assigned driver"
          />
        </div>
        <div class="modal-footer">
          <button class="button" @click="deleteTour">Delete</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import axios from 'axios'

import { ServerRoute } from '@enum/ServerRoute'

import FreeTextInputVue from '../input/FreeTextInput.vue'

type ComponentData = {
  tour: {
    customerName: string
    shipmentDate: string
    locationFrom: string
    locationTo: string
    assignedDriver: string
  } | null
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
      tour: null,
    }
  },
  computed: {
    dataIsReady(): boolean {
      return this.tour !== null
    },
  },
  async created(): Promise<void> {
    try {
      const uri = `${ServerRoute.Tour}/${this.tourId}`
      const response = await axios.get(uri)
      const { tour } = response.data
      this.tour = {
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
    async deleteTour(): Promise<void> {
      try {
        const uri = `${ServerRoute.Tour}/${this.tourId}`
        await axios.delete(uri)
        this.$emit('tourDeleted')
      } catch (error) {
        alert('Something went wrong. Please try again.')
        console.log(error)
      } finally {
        this.$emit('modalClosed')
      }
    },
  },
}
</script>
