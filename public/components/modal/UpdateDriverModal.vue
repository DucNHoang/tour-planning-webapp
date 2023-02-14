<template>
  <transition name="modal">
    <div class="modal-overlay">
      <div v-if="dataIsReady" class="modal-content">
        <div class="modal-header">
          <h3>Update Driver</h3>
          <button @click="$emit('modalClosed')">&times;</button>
        </div>
        <div class="modal-body">
          <!-- Add input forms here -->
          <FreeTextInputVue v-model="updatedDriver.name" label="Name" />
          <FreeTextInputVue v-model="updatedDriver.location" label="Location" />
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
            @click="updateDriver"
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

import FreeTextInputVue from '../input/FreeTextInput.vue'

import { containsNumber } from '../../helpers/containsNumber'

import { Driver } from '@type/Driver'

type ComponentData = {
  updatedDriver: Omit<Driver, 'id'> | null
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
      updatedDriver: null,
    }
  },
  computed: {
    feedbackMessages(): string[] {
      const array: string[] = []
      if (this.updatedDriver === null) return array
      const { name, location } = this.updatedDriver
      if (name === '' || location === '') array.push('No field can be empty.')
      if (containsNumber(location))
        array.push('Location cannot contain any number.')
      return array
    },
    dataIsReady(): boolean {
      return this.updatedDriver !== null
    },
  },
  async created(): Promise<void> {
    try {
      const driver = await DriverService.getDriverById(this.driverId)
      this.updatedDriver = driver
    } catch (error) {
      alert('Something went wrong. Please try again.')
      console.log(error)
    }
  },
  methods: {
    async updateDriver(): Promise<void> {
      try {
        const updatedDriver = cloneDeep(this.updatedDriver)

        if (isNil(updatedDriver))
          throw new Error('updatedDriver object is null or undefined.')

        await DriverService.updateDriver(this.driverId, updatedDriver)
        this.$emit('driverUpdated')
      } catch (error) {
        alert('Something went wrong. Please try again.')
        console.log(error)
      } finally {
        this.$emit('modalClosed')
        this.updatedDriver = null
      }
    },
  },
}
</script>
