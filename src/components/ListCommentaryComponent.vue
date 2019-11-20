<template>
  <div>
    <div class="header-commentary">
      <span style="color:#6C757D; font-weight: 600;"><i class="far fa-comments" style="color:#78eea3;"></i>
        {{ commentaire.user }} </span>
      <star-rating class="rating-commentary" :star-size="15" inactive-color="#c8d6e5" active-color="#78eea3"
        border-color="#78eea3" :rating="commentaire.rating" :read-only="true" :show-rating="false"></star-rating>
    </div>
    <p>{{ commentaire.content }}</p>
  </div>

</template>

<script>
  import store from './RestaurantStore'
  import StarRating from 'vue-star-rating'

  export default {
    components: {
      StarRating,
    },
    props: ['commentaire'],
    data() {
      return {
        restaurants: store.restaurants,
      }
    }
  }

</script>

<style>
 /* styles des commentaires dans cartes restaurant */
  .commentary-section {
      padding-left: 10px;
      padding-right: 10px;
  }
  .commentary-section .card-text {
    background: rgba(247, 247, 247, 0.6);
    padding: 5px 10px;
    font-size: 15px;
    border-radius: .4em;
    border: solid 1px rgba(178, 190, 195, 1.0);
    margin-bottom: 10px;
  }

  .commentary-section .header-commentary {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
  }

  .commentary-section .header-commentary .rating-commentary {
    position: relative;
    top: -3px;
    margin-left: 10px;
  }

  .footer-commentary {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .footer-commentary .show-commentary {
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
    margin-left: 10px;
  }

  .footer-commentary .fa-plus-circle {
    font-size: 20px;
    position: relative;
    right: 10px;
    cursor: pointer;
  }
  /* fin de styles des commentaires dans cartes restaurant */
</style>
