<template>
  <div id="app">
    
    <Header :poiInfo="poiInfo"></Header>

    <Nav :commentNum="commentNum"> </Nav>

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
      poiInfo: {},
      commentNum: 0
    }
  },

  created() {
    const that = this;

    this.$axios.get('/api/goods')
      .then((response) => {
        const dataSource = response.data;
        if (dataSource.code === 0) {
          that.poiInfo = dataSource.data.poi_info;
        }
      })
      .catch((err) => {

      });

    this.$axios.get('/api/ratings')
      .then((response) => {
        const dataSource = response.data;
        if (dataSource.code === 0) {
          that.commentNum = dataSource.data.comment_num;
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
