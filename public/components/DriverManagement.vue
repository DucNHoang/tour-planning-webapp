<template>
  <div>
    <button class="button" @click="addButtonClicked()">Add driver</button>

    <div style="height: 20px"></div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="driver in drivers" :key="driver.id">
          <td>{{ driver.name }}</td>
          <td>{{ driver.location }}</td>
          <td>
            <button class="button" @click="updateButtonClicked(driver.id)">
              Update
            </button>
            <button class="button" @click="deleteButtonClicked(driver.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <AddDriverModalVue
      v-if="showAddDriverModal"
      @modalClosed="showAddDriverModal = false"
      @newDriverAdded="getDrivers"
    ></AddDriverModalVue>
    <UpdateDriverModalVue
      v-if="showUpdateDriverModal"
      :driver-id="driverIdInProcess"
      @modalClosed="
        showUpdateDriverModal = false
        resetDriverIdInProcess()
      "
      @driverUpdated="getDrivers"
    ></UpdateDriverModalVue>
    <DeleteDriverModalVue
      v-if="showDeleteDriverModal"
      :driver-id="driverIdInProcess"
      @modalClosed="
        showDeleteDriverModal = false
        resetDriverIdInProcess()
      "
      @driverDeleted="getDrivers"
    ></DeleteDriverModalVue>
  </div>
</template>

<script lang="ts">
import { DriverService } from 'public/services/DriverService'

import { Driver } from '@type/Driver'

import AddDriverModalVue from './modal/AddDriverModal.vue'
import UpdateDriverModalVue from './modal/UpdateDriverModal.vue'
import DeleteDriverModalVue from './modal/DeleteDriverModal.vue'

type ComponentData = {
  drivers: Driver[]
  showAddDriverModal: boolean
  showUpdateDriverModal: boolean
  showDeleteDriverModal: boolean
}

export default {
  components: {
    AddDriverModalVue,
    UpdateDriverModalVue,
    DeleteDriverModalVue,
  },
  data(): ComponentData {
    return {
      drivers: [],
      showAddDriverModal: false,
      showUpdateDriverModal: false,
      showDeleteDriverModal: false,
    }
  },
  async created(): Promise<void> {
    await this.getDrivers()
  },
  methods: {
    async getDrivers(): Promise<void> {
      try {
        const drivers = await DriverService.getAllDrivers()
        this.drivers = drivers
        return
      } catch (error) {
        alert('Something went wrong. Please try again.')
        console.log(error)
      }
    },
    addButtonClicked(): void {
      this.showAddDriverModal = true
    },
    updateButtonClicked(driverId: string): void {
      this.driverIdInProcess = driverId
      this.showUpdateDriverModal = true
    },
    deleteButtonClicked(driverId: string): void {
      this.driverIdInProcess = driverId
      this.showDeleteDriverModal = true
    },
    resetDriverIdInProcess(): void {
      this.driverIdInProcess = ''
    },
  },
}
</script>
