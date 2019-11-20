<template>
  <section class="list-restaurants">
    <div class="text-muted empty" v-if="restaurants.length === 0">
      <p>Il n'y a pas de restaurant dans votre liste.
        <br />Cliquez sur la carte pour en ajouter un !<p>
          <div><i class="far fa-frown fa-3x" style="color:#78eea3;"></i></div>
    </div>
    <ul class="list-group ul-list-group" v-else>
      <h4 class="text-muted">Vos dernières adresses ajoutées :</h4>
      <div class="filtered-list">
        <span class="text-muted">Afficher les restaurants entre :</span>
        <star-rating class="rating-filter" :star-size="15" inactive-color="#c8d6e5" active-color="#78eea3" border-color="#78eea3"
          :rating="3" :show-rating="false" @rating-selected="setRatingMin"></star-rating>
        <span class="text-muted">et</span>
        <star-rating class="rating-filter" :star-size="15" inactive-color="#c8d6e5" active-color="#78eea3" border-color="#78eea3"
          :rating="5" :show-rating="false" @rating-selected="setRatingMax"></star-rating>
      </div>
      <transition-group name="list">
       <li class="list-group-item" v-for="(restaurant, index) in filteredItems()" :key="restaurant.nom">
          <ListCard :restaurants="restaurants" :restaurant="restaurant" :index="index"/>
      </li>
      </transition-group>
    </ul>
  </section>
</template>

<script>
  import store from './RestaurantStore'
  import StarRating from 'vue-star-rating'
  import ListCard from './ListCardComponent'

  export default {
    components: {
      StarRating,
      ListCard,
    },
    data() {
      return {
        restaurants: store.restaurants,
        minRating: 0,
        maxRating: 0
      }
    },
    methods: {
      //recupère le min du filter rating
      setRatingMin(rating) {
        this.minRating = rating;
      },
      //recupère le max du filter rating
      setRatingMax(rating) {
        this.maxRating = rating;
      },
      //filtre les restaurants selon leur note
      filteredItems(){
        if(this.minRating === 0 && this.maxRating === 0){
          return this.reverseItems
        }if(this.minRating > 0 && this.maxRating > 0){
          return this.reverseItems.filter(element => 
                 element.averageRating >= this.minRating && element.averageRating <= this.maxRating
              )
            }
        }
    },
    computed: {
      //retourne le tableau des restaurants inversé
      reverseItems() {
        return this.restaurants.reverse();
      }
    }
  }

</script>

<style>
  .empty {
    text-align: center;
    padding: 20px 0 40px 0;
    border: solid .05em grey;
    border-radius: .4em;
  }
  /* styles de la liste globale */
  .list-group-item {
    border: 1px solid transparent;
  }

  .list-group h4 {
    text-align: center;
  }

  /* fin styles de la liste globale */

  /* styles section filtre */
  .list-group .filtered-list {
    display: flex;
    flex-direction: row;
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .filtered-list .rating-filter {
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
    top: -2px;
  }

  /* fin de styles section filtre */
  /* Effet de transition à l'ajout & suppression d'un restaurant */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
/* Fin de effet de transition à l'ajout & suppression d'un restaurant */

</style>
