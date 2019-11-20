<template>

  <section id="additional-restaurant-section">
    <div id="header-additional-restaurant-section">
      <div class="row justify-content-center" id="title-section">
        <div class="col-6 col-sm-12 col-md-8">
          <h5 class="text-muted"><i class="fas fa-map-marked fa-2x" style="color:#78eea3;"></i> Ajoutez plus de
            restaurants
            sur votre carte :</h5>
        </div>
      </div>
      <div class="form-group row justify-content-center">
        <div class="col-6" id="search-place-section">
          <label for="">Je souhaite ajouter des restaurants à proximité de :
            <gmap-autocomplete placeholder="votre lieu" @place_changed="setPlace" id="gmap-autocomplete">
            </gmap-autocomplete><button class="btn btn-primary" @click="onClick(place)">Rechercher</button>
          </label>
        </div>
      </div>
    </div>
    <div id="list-additional-restaurants">
      <ul class="list-group">
        <li class="list-group-item" v-for="(restaurant, index) in additionalRestaurants" :key="restaurant.id">
          <additional-restaurant-card :additionalRestaurants="additionalRestaurants" :restaurant="restaurant" :index="index"/>
        </li>
      </ul>
    </div>
  </section>

</template>

<script>
  import store from './RestaurantStore'
  import StarRating from 'vue-star-rating'
  import AdditionalRestaurantCard from './AdditionalRestaurantCard'
  import AdditionalRestaurantForm from './AdditionalRestaurantForm'

  export default {
    components: {
      AdditionalRestaurantCard,
      AdditionalRestaurantForm,
      StarRating,
    },
    props: {
      onClick: Function,
      additionalRestaurants: Array
    },
    data() {
      return {
        place: '',
        placesService: '',
        restaurants: store.restaurants,
        radius: 0,
      }
    },
    methods: {
      setPlace(place) {
        this.place = place
      },
    }
  }

</script>

<style scoped>
  /* style de la zone search */
  #header-additional-restaurant-section #title-section {
    margin-top: 40px;
    margin-bottom: 30px;
  }

  #title-section h5 {
    text-align: center;
  }

  #title-section .fa-map-marked {
    margin-right: 10px;
  }

  #search-place-section label {
    text-align: center;
  }

  #search-place-section button {
    margin-left: 10px;
    background: rgba(120, 238, 163, 1);
    border-color: rgba(120, 238, 163, 1);
  }

  #gmap-autocomplete {
    margin-top: 20px;
    width: 280px;
  }

  /* fin de style de la zone search */
</style>
