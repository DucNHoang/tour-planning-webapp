<template>
  <div class="input-container">
    <label>{{ label }}:</label>
    <input
      v-model="inputValue"
      :readonly="readonly"
      type="text"
      @input="processInput"
    />
  </div>
</template>

<script lang="ts">
type ComponentData = {
  inputValue: string
}

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data(): ComponentData {
    return {
      inputValue: this.value,
    }
  },
  methods: {
    processInput() {
      this.$emit('input', this.inputValue)
    },
  },
}
</script>
