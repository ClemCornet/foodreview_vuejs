<template>
    <div class="card">
            <div class="card-header">
              <h5 class="card-title">{{ restaurant.nom }}</h5>
            </div>
            <div class="card-body">
              <gmap-street-view-panorama class="pano" :position="restaurant.position" :pov="pov" :zoom="1">
              </gmap-street-view-panorama>
              <div class="card-body-01">
                <p class="card-text"><i class="fas fa-map-pin fa-2x" style="color:#78eea3;"></i> {{ restaurant.adresse
                  }}</p>
                <star-rating class="rating-commentary" :star-size="20" inactive-color="#c8d6e5" active-color="#78eea3"
                  border-color="#78eea3" :rating="restaurant.averageRating" :read-only="true" :show-rating="false"></star-rating>
                <span class="text-muted"><strong>{{ restaurant.ratingsTotal }} </strong>avis déposé(s) sur Google maps.</span>
              </div>
              <div class="card-body-02">
                <span href="#" class="text-muted" @click="showForm">Ajouter à ma liste <i class="fas fa-plus-circle"
                    style="color:#78eea3;margin-right: 15px;"></i></span>
              </div>
            </div>
            <transition name="fade">
             <div class="col-md-6 offset-md-3 add-form" v-show="formOpen">
            <additional-restaurant-form @close="showForm" :additionalRestaurants="additionalRestaurants" :restaurant="restaurant" :index="index" />
          </div>
          </transition>
        </div>
</template>

<script>
  import store from './RestaurantStore'
  import StarRating from 'vue-star-rating'
  import AdditionalRestaurantForm from './AdditionalRestaurantForm'

  export default {
    components: {
      StarRating,
      AdditionalRestaurantForm,
    },
    props: {
      additionalRestaurants: Array,
      restaurant: Object,
      index: Number      
    },

    data() {
      return {
          formOpen: false,
      }
    },
    methods: {
        showForm() {
        if (this.formOpen != true) {
          this.formOpen = true
        } else if (this.formOpen == true)
          this.formOpen = false;
      },
    }
  }

</script>

<style scoped>
      /* style des cartes restaurants */
  #list-additional-restaurants .list-group .list-group-item .card .card-body {
    display: flex;
    flex-direction: row;
  }

  /* header de la carte */
  #list-additional-restaurants .card .card-header {
    background-color: rgba(120, 238, 163, 1);
    color: white;
    height: 40px;
  }

  /* panorama */
  .pano {
    width: 300px;
    height: 200px;
  }

  /* fin de style panorama */
  /* intérieur des cartes */
  .card-body .card-body-01 {
    margin-left: 30px;
    width: 40%;
  }

  .card-body-02 {
    align-self: flex-start;
    margin-top: 10px;
    margin-left: 20px;
    padding: 10px 20px;
    cursor: pointer;
  }

  /* intérieur des cartes */
  /* fin de style des cartes restaurants */
  /* formulaire ajout */
  .add-form {
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 30px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 6px 8px 10px 0px rgba(0, 0, 0, 0.3);
  }

  /* fin de formulaire ajout */
</style>