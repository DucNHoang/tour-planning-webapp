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
          <FreeTextInputVue
            v-model="updatedDriver.name"
            label="Name"
          />
          <FreeTextInputVue
            v-model="updatedDriver.location"
            label="Location"
          />
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
import axios from 'axios'
import { cloneDeep, isNil } from 'lodash'

import { ServerRoute } from '@enum/ServerRoute'

import FreeTextInputVue from '../input/FreeTextInput.vue'

type ComponentData = {
  updatedDriver: {
    name: string
    location: string
  } | null
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
      if (this.containsNumber(location))
        array.push('Location cannot contain any number.')
      return array
    },
    dataIsReady(): boolean {
      return this.updatedDriver !== null
    },
  },
  async created(): Promise<void> {
    try {
      const response = await axios.get(`${ServerRoute.Driver}/${this.driverId}`)
      const { driver } = response.data
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

        const uri = `${ServerRoute.Driver}/${this.driverId}`
        await axios.put(uri, updatedDriver)
        this.$emit('driverUpdated')
      } catch (error) {
        alert('Something went wrong. Please try again.')
        console.log(error)
      } finally {
        this.$emit('modalClosed')
        this.updatedDriver = null
      }
    },
    containsNumber(value: string | number): boolean {
      const isTypeNumber = typeof value === 'number'
      if (isTypeNumber) return true
      const isStringContainingNumber = /\d/.test(value)
      if (isStringContainingNumber) return true
      return false
    },
  },
}
</script>
