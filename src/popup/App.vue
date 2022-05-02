<template>
  <div class="container-fluid">
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Shortcut URL</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" @click="openOptionPage($event)">Option</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
        </div>
        <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
          <span data-feather="calendar"></span>
          This week
        </button>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome!',
    }
  },
  methods:{
    openOptionPage(e) {
      e.preventDefault();

      chrome.tabs.create({url: 'options.html'});
    },
  }
}
</script>

<style>
body {
  min-width: 600px; /* your desired width */
  max-width: 100%;
  min-height: 450px;
  max-height: 100%;
  position: relative;
  vertical-align: middle;
}
</style>
