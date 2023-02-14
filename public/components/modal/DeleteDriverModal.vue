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
            v-model="driver.name"
            :readonly="true"
            label="Name"
          />
          <FreeTextInputVue
            v-model="driver.location"
            :readonly="true"
            label="Location"
          />
        </div>
        <div class="modal-footer">
          <button class="button" @click="deleteDriver">Delete</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { DriverService } from 'public/services/DriverService'

import FreeTextInputVue from '../input/FreeTextInput.vue'

import { Driver } from '@type/Driver'

type ComponentData = {
  driver: Omit<Driver, 'id'> | null
}

export default {
  components: {
    FreeTextInputVue,
  },
  props: {
    driverId: {
      type: String,
      default: '',
    },
  },
  data(): ComponentData {
    return {
      driver: null,
    }
  },
  computed: {
    dataIsReady(): boolean {
      return this.driver !== null
    },
  },
  async created(): Promise<void> {
    try {
      const driver = await DriverService.getDriverById(this.driverId)
      this.driver = driver
    } catch (error) {
      alert('Something went wrong. Please try again.')
      console.log(error)
    }
  },
  methods: {
    async deleteDriver(): Promise<void> {
      try {
        await DriverService.deleteDriver(this.driverId)
        this.$emit('driverDeleted')
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
