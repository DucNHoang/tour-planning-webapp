<template>
  <div>
    <button class="button" @click="addButtonClicked()">Add tour</button>

    <div style="height: 20px"></div>

    <table>
      <thead>
        <tr>
          <th>Customer name</th>
          <th>Shipment date</th>
          <th>Location from</th>
          <th>Location to</th>
          <th>Assigned driver</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tour in tours" :key="tour.id">
          <td>{{ tour.customerName }}</td>
          <td>{{ tour.shipmentDate }}</td>
          <td>{{ tour.locationFrom }}</td>
          <td>{{ tour.locationTo }}</td>
          <td>{{ tour.assignedDriver }}</td>
          <td style="width: min-content">
            <button class="button" @click="updateButtonClicked(tour.id)">
              Update
            </button>
            <button class="button" @click="deleteButtonClicked(tour.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <AddTourModalVue
      v-if="showAddTourModal"
      @modalClosed="showAddTourModal = false"
      @newTourAdded="getTours"
    ></AddTourModalVue>
    <UpdateTourModalVue
      v-if="showUpdateTourModal"
      :tour-id="tourIdInProcess"
      @modalClosed="
        showUpdateTourModal = false
        resetTourIdInProcess()
      "
      @tourUpdated="getTours"
    ></UpdateTourModalVue>
    <DeleteTourModalVue
      v-if="showDeleteTourModal"
      :tour-id="tourIdInProcess"
      @modalClosed="
        showDeleteTourModal = false
        resetTourIdInProcess()
      "
      @tourDeleted="getTours"
    ></DeleteTourModalVue>
  </div>
</template>

<script lang="ts">
import { TourService } from 'public/services/TourService'

import AddTourModalVue from './modal/AddTourModal.vue'
import UpdateTourModalVue from './modal/UpdateTourModal.vue'
import DeleteTourModalVue from './modal/DeleteTourModal.vue'

import { Tour } from '@type/Tour'

type ComponentData = {
  tours: Tour[]
  tourIdInProcess: string
  showAddTourModal: boolean
  showUpdateTourModal: boolean
  showDeleteTourModal: boolean
}

export default {
  components: {
    AddTourModalVue,
    UpdateTourModalVue,
    DeleteTourModalVue,
  },
  data(): ComponentData {
    return {
      tours: [],
      tourIdInProcess: '',
      showAddTourModal: false,
      showUpdateTourModal: false,
      showDeleteTourModal: false,
    }
  },
  async created(): Promise<void> {
    await this.getTours()
  },
  methods: {
    async getTours(): Promise<void> {
      try {
        const tours = await TourService.getAllTours()
        this.tours = tours
        return
      } catch (error) {
        alert('Something went wrong. Please try again.')
        console.log(error)
      }
    },
    addButtonClicked(): void {
      this.showAddTourModal = true
    },
    updateButtonClicked(tourId: string): void {
      this.tourIdInProcess = tourId
      this.showUpdateTourModal = true
    },
    deleteButtonClicked(tourId: string): void {
      this.tourIdInProcess = tourId
      this.showDeleteTourModal = true
    },
    resetTourIdInProcess(): void {
      this.tourIdInProcess = ''
    },
  },
}
</script>
