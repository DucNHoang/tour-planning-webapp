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
          <FreeTextInput
            v-model="driver.name"
            :readonly="true"
            label="Name"
          />
          <FreeTextInput
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
import axios from 'axios'
import { cloneDeep } from 'lodash'

import { ServerRoute } from '@enum/ServerRoute'

import FreeTextInput from '../FreeTextInput.vue'

type ComponentData = {
  driver: {
    name: string
    location: string
  } | null
}

export default {
  components: {
    FreeTextInput,
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
      const uri = `${ServerRoute.Driver}/${this.driverId}`
      const response = await axios.get(uri)
      const { driver } = response.data
      this.driver = driver
    } catch (error) {
      alert('Something went wrong. Please try again.')
      console.log(error)
    }
  },
  methods: {
    async deleteDriver(): Promise<void> {
      try {
        const uri = `${ServerRoute.Driver}/${this.driverId}`
        await axios.delete(uri)
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
