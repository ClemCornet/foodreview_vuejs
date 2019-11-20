<template>
  <div class="form-group">
      <h5 class="text-muted">Ajouter {{ restaurant.nom }}</h5>
      <div class="icon-close text-muted" @click="close"><strong>X</strong></div>
    <input type="text" class="form-control" id="inputusername" placeholder="Entrer votre nom" v-model="nameUser">
    <star-rating v-bind:increment="1" inactive-color="#c8d6e5" active-color="#78eea3" border-color="#78eea3" :star-size="20"
      @rating-selected="setRating" :rating="3" class="star-rating"></star-rating>
    <div class="tag-section">
      <div class="text-muted choose-tag" v-show="tagSelected.length <= 0">Choisissez au moins un tag ...</div>
      <div class="list-tags-selected">
        <span class="badge" v-for="(tag, index) in tagSelected" :key="tag.class" :class="[tag.class]" @click="deleteTag(index)">{{
          tag.content }}</span>
      </div>
      <div class="list-tags-available">
        <span class="badge" v-for="(tag, index) in tags" :key="tag.class" :class="[tag.class]" @click="addTag(index)">{{ tag.content }}</span>
      </div>
    </div>
    <textarea class="form-control" placeholder="ajoutez un commentaire..." id="textAreaComment" rows="3" v-model="commentaryUser"></textarea>
    <button class="btn btn-green" @click="addRestaurant(index)">Ajouter</button>
  </div>
</template>

<script>
  import store from './RestaurantStore'
  import StarRating from 'vue-star-rating'

  export default {
    components: {
      StarRating,
    },
    props: {
      additionalRestaurants: Array,
      restaurant: Object,
      index: Number      
    },
    data() {
      return {
        restaurants: store.restaurants,
        tagSelected: [],
        nameUser: '',
        commentaryUser: '',
        ratingUser: 0,
        tags: [{
            class: 'try',
            content: 'A essayer',
          },
          {
            class: 'friends',
            content: 'Entre amis',
          },
          {
            class: 'asian',
            content: 'Asiatique',
          },
          {
            class: 'italian',
            content: 'Italien',
          },
          {
            class: 'french',
            content: 'Français',
          },
          {
            class: 'burger',
            content: 'Burger',
          },
          {
            class: 'vegan',
            content: 'Vegan',
          }
        ],
      }
    },
    methods: {
      //recupère la note de l'utilisateur
      setRating(rating) {
        this.ratingUser = rating;
      },
      //ajoute un tag au tableau des tags séléctionnés
      addTag(idx) {
        this.tagSelected.push(this.tags[idx])
      },
      //supprime un tag du tableau des tags séléctionnés
      deleteTag(idx) {
        this.tagSelected.splice(idx, 1);
      },
      //ajoute le restaurant à la liste des restaurants de l'utilisateur
      addRestaurant(idx) {
        this.restaurants.push({
          position: this.restaurant.position,
          nom: this.restaurant.nom,
          adresse: this.restaurant.adresse,
          tags: this.tagSelected,
          averageRating: this.ratingUser,
          commentaires: [{
            user: this.nameUser,
            content: this.commentaryUser,
            rating: this.ratingUser
          }]
        }),
        this.additionalRestaurants.splice(idx, 1)
        this.$emit('close')
        this.nameUser = ''
        this.ratingUser = 0
        this.commentaryUser = ''
        this.tagSelected = []
      },
      //ferme le formulaire
      close() {
        this.$emit('close');
      },
    }
  }

</script>

<style scoped>
  .form-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  h5 {
    width: 80%;
    text-align: center;
    margin-left: 30px;
  }
  .icon-close{
    flex-basis: 5%;
    cursor: pointer;
  }

  #inputusername {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 250px;
  }

  .star-rating {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 40px;
  }

  /* style des tags */
  .tag-section{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .tag-section .choose-tag {
    margin-bottom: 20px;
  }

  /* button */
  .btn {
    margin-top: 10px;
    background: rgba(120, 238, 163, 1);
    border: none;
    justify-self: flex-end;
  }

</style>
