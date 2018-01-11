<template>
  <div id="app">
    
    <Header></Header>

    <Nav> </Nav>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/header/Header';
import Nav from './components/nav/Nav';

export default {
  name: 'app',
  components: {
    Header,
    Nav
  }
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
</style>
