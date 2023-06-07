<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import '../src/background/canvas.js'
export default {
  
}
</script>

<style lang="scss">
  // @import '../src/background/index.css';
html {
  height: 100%;
}

body {
  margin: 0;
  font-family: Helvetica, sans-serif;
  overflow: hidden;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
