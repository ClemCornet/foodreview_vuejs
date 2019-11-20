<template>
  <header class="row">
    <div class="col-lg">
      <h1>Bienvenue sur Food Review</h1>
      <i class="fas fa-chevron-down fa-2x" id="chevron"></i>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
}

</script>

<style scoped>
  header {
    position: relative;
    height: 600px;
    color: white;
    background-image: url("../assets/header.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    text-align: center;
  }
  header h1 {
    font-weight: 600;
    text-shadow: 2px 2px 10px #353b48;
  }
  #chevron {
    position: relative;
    top: 90px;
  }

</style>
