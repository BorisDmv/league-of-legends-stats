<template>

  <router-view/>
</template>

<style lang="scss">
@import url(https://db.onlinewebfonts.com/c/12420e8c141ca7c3dff41de2d59df13e?family=BeaufortforLOL-Bold);

body {
  background-color: rgba(10, 10, 10, 1);
  font-family: "Beaufort for LOL", "Arial", sans-serif;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
