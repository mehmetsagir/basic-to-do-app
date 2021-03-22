<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
a {
  text-decoration: none;
  color: inherit;
}
body,
html {
  width: 100%;
  height: 100%;
  background: #f4f6f9;
}
.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 3px;
}
</style>
