<template>
  <nav class="navbar">
    <img slot="logo" alt="Loady logo" src="../assets/logo.png" />

    <div slot="title">
      <h2>Tour Planning Dashboard</h2>
    </div>

    <div slot="action">
      <button
        class="button"
        :class="{ 'button-active': isDriverPage }"
        @click="driverManagementClicked()"
      >
        Driver management
      </button>
      <button
        class="button"
        :class="{ 'button-active': isTourPage }"
        @click="tourManagementClicked()"
      >
        Tour management
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  computed: {
    isDriverPage(): boolean {
      return this.$route.path === '/driver'
    },
    isTourPage(): boolean {
      return this.$route.path === '/tour'
    },
  },
  methods: {
    driverManagementClicked(): void {
      // Guard if we're already on the /driver route, do nothing to avoid the error NavigationDuplicated.
      if (this.$route.path === '/driver') return
      this.$router.push('/driver')
    },
    tourManagementClicked(): void {
      // Guard if we're already on the /tour route, do nothing to avoid the error NavigationDuplicated.
      if (this.$route.path === '/tour') return
      this.$router.push('/tour')
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}

.navbar {
  display: grid;
  align-items: center;
  grid-template-columns: [logo] 1fr [title] 2fr [action] 3fr;
  padding-bottom: 1%;
}

.logo {
  grid-column: logo;
}

.title {
  grid-column: title;
}

.action {
  grid-column: action;
  align-items: center;
}

.button {
  height: 50px;
  margin-right: 20px;
}

.button-active {
  color: #ffffff;
  background-color: #059ff1;
}
</style>
