<template>
  <div id="app" class="dashboard-container">
    <header class="dashboard-container__header">
      <NavBarVue> </NavBarVue>
    </header>
    <main class="dashboard-container__main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import NavBarVue from './NavBar.vue'

export default {
  components: {
    NavBarVue,
  },
}
</script>

<style lang="scss">
#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  text-align: right;
}
li {
  display: block;
  margin: 0 10px;
  color: #ff0000;
  font-size: smaller;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #ddd;
}

tr:nth-child(even) {
  background-color: #e5f3f9;
}

table {
  border-collapse: collapse;
  width: 100%;
}

label {
  margin-right: 10px;
  width: 40%;
}
input {
  width: 60%;
}
input[readonly] {
  border: none;
}
.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
}

.navbar {
  column-gap: 2%;
}

.dashboard-container {
  grid-template-columns: 100%;
  padding: 1%;
}

.template-status {
  &__draft {
    color: #f79105;
  }
  &__live {
    color: #41c891;
  }
  &__completed {
    color: #5e5a72;
  }
}

.button {
  border-radius: 10px;
  border: 1px solid #059ff1;
  display: inline-block;
  width: auto;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  padding: 10px 25px;
  color: #059ff1;
  background-color: #ffffff;
}

button:hover {
  background-color: #059ff1;
  color: #ffffff;
}

button:disabled {
  border: 1px solid #808080;
  background-color: #d3d3d3;
  color: #808080;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  transition: opacity 0.3s ease;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  transition: all 0.3s ease;
  width: 25%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
