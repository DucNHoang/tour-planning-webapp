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
import { TourService } from 'public/services/TourService'

import FreeTextInputVue from '../input/FreeTextInput.vue'

import { Tour } from '@type/Tour'

type ComponentData = {
  tour: Omit<Tour, 'id'> | null
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
      const tour = await TourService.getTourById(this.tourId)
      this.tour = tour
    } catch (error) {
      alert('Something went wrong. Please try again.')
      console.log(error)
    }
  },
  methods: {
    async deleteTour(): Promise<void> {
      try {
        await TourService.deleteTour(this.tourId)
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
