<template>
  <div id="app">
    
    <Header :poiInfo="poiInfo"></Header>

    <Nav> </Nav>

    <router-view></router-view>
  </div>
</template>

<script>
import Header from 'components/header/Header';
import Nav from 'components/nav/Nav';

export default {
  name: 'app',
  components: {
    Header,
    Nav
  },
  data() {
    return {
      poiInfo: {}
    }
  },

  created() {
    const that = this;

    this.$axios.get('/api/goods')
      .then((response) => {
        const dataSource = response.data;
        console.log(dataSource);
        if (dataSource.code === 0) {
          that.poiInfo = dataSource.data.poi_info;
          console.log(that.poiInfo);
        }
      })
      .catch((err) => {

      })
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
}
</style>
