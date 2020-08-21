<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
  background: #ffffff;
  color: #252525;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  font-size: 14px;
  margin: 0px;
  overflow-x: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
