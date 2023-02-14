<template>
  <transition name="modal">
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add Driver</h3>
          <button @click="$emit('modalClosed')">&times;</button>
        </div>
        <div class="modal-body">
          <!-- Add input forms here -->
          <FreeTextInputVue v-model="newDriver.name" label="Name" />
          <FreeTextInputVue v-model="newDriver.location" label="Location" />
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
            @click="saveDriver"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash'

import { DriverService } from 'public/services/DriverService'

import FreeTextInputVue from '../input/FreeTextInput.vue'

import { containsNumber } from '../../helpers/containsNumber'

import { Driver } from '@type/Driver'

type ComponentData = {
  newDriver: Omit<Driver, 'id'>
}

export default {
  components: {
    FreeTextInputVue,
  },
  data(): ComponentData {
    return {
      newDriver: {
        name: '',
        location: '',
      },
    }
  },
  computed: {
    feedbackMessages(): string[] {
      const array: string[] = []
      const { name, location } = this.newDriver
      if (name === '' || location === '') array.push('No field can be empty.')
      if (containsNumber(location))
        array.push('Location cannot contain any number.')
      return array
    },
  },
  methods: {
    async saveDriver(): Promise<void> {
      try {
        const newDriver = cloneDeep(this.newDriver)
        await DriverService.saveNewDriver(newDriver)
        this.$emit('newDriverAdded')
      } catch (error) {
        alert('Something went wrong. Please try again.')
        console.log(error)
      } finally {
        this.$emit('modalClosed')
        this.newDriver.name = ''
        this.newDriver.location = ''
      }
    },
  },
}
</script>
