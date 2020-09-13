<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

*{
  margin: 0;
  padding: 0;
}

body{
  width: 100%;
  height: 100%;
  max-height: 2000px;
  background-color: #DDDDDD;
}

.info_block{
  width: 90%;
  padding: 10px;
  text-align: left;
}

.detailedinfo{
  display: inline-block;
  padding: 10px;
}

.logout{
  position: fixed;
  top: 5px;
  right: 5px;
  background-color:rgba(255, 255, 255, 0.7); 
  padding: 24px 18px;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
}
</style>
