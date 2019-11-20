<template>
  <div id="app" class="container-fluid">
    <Header/>
    <MapComponent/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import MapComponent from './components/MapComponent'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    MapComponent,
    Footer
  }
}
</script>

<style>
/* * {
margin: 0;
padding: 0;
} */
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
