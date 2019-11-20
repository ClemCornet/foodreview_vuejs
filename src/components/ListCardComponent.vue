<template>
  <div class="card">
    <div class="card-header">
      <h6>{{ restaurant.nom }}</h6><span class="delete-item" @click="deleteItem(index)"><i class="far fa-trash-alt"
          style="color: #ffffff;"></i></span>
    </div>
    <div class="card-body">
      <div class="adresse-section">
        <p class="card-title"><i class="fas fa-map-pin" style="color:#78eea3;"></i> {{ restaurant.adresse }}</p>
      </div>
      <div class="tag-section" v-for="tag in restaurant.tags" :key="tag.class">
        <span class="badge" :class="[tag.class]">{{ tag.content }}</span>
      </div>
      <div class="rating-section">
        <star-rating :star-size="20" inactive-color="#c8d6e5" active-color="#78eea3" border-color="#78eea3" :rating="calcMoyenne(restaurant.commentaires)"
          :read-only="true" :show-rating="false">
        </star-rating>
        <span class="total-commentary">({{ restaurant.commentaires.length }})</span>
      </div>
    </div>
    <div class="commentary-section">
      <h6>Notes et commentaires :</h6>
      <div class="card-text">
        <div>
          <div class="header-commentary">
            <span style="color:#6C757D; font-weight: 600;"><i class="far fa-comments" style="color:#78eea3;"></i>
              {{ restaurant.commentaires[0].user }} </span>
            <star-rating class="rating-commentary" :star-size="15" inactive-color="#c8d6e5" active-color="#78eea3"
              border-color="#78eea3" :rating="restaurant.commentaires[0].rating" :read-only="true" :show-rating="false"></star-rating>
          </div>
          <p>{{ restaurant.commentaires[0].content }}</p>
        </div>
      </div>
      <div class="card-text" v-for="(commentaire, idx) in restaurant.commentaires" :key="commentaire.user" v-if="idx > 0" v-show="showCommentaryisOpen">
        <listCommentary :commentaire="commentaire" />
      </div>
    </div>
    <div class="footer-commentary">
      <span class="text-muted show-commentary" @click="showAllCommentary">Voir tous les commentaires</span>
      <i class="fas fa-plus-circle" style="color:#78eea3;" @click="showAddCommentary"></i>
    </div>
    <transition name="fade">
    <div class="add-commentary form-group" v-show="addCommentaryisOpen">
      <input type="text" class="form-control" id="inputNomUser" placeholder="Entrer votre nom" v-model="nameUser">
      <star-rating class="rating-commentary" v-bind:increment="1" inactive-color="#c8d6e5" active-color="#78eea3"
        border-color="#78eea3" :star-size="15" @rating-selected="setRatingUser" :rating="3">
      </star-rating>
      <textarea class="form-control" placeholder="ajoutez un commentaire..." id="textAreaComment" rows="3" v-model="commentaryUser"></textarea>
      <button class="btn btn-green" @click="addCommentary(index)">Ajouter</button>
    </div>
    </transition>
  </div>
</template>

<script>
  import store from './RestaurantStore'
  import StarRating from 'vue-star-rating'
  import ListCommentary from './ListCommentaryComponent'

  export default {
    components: {
      StarRating,
      ListCommentary,
    },
    props: ['restaurants', 'restaurant', 'index'],
    data() {
      return {
        addCommentaryisOpen: false,
        showCommentaryisOpen: false,
        nameUser: '',
        ratingUser: 0,
        commentaryUser: '',
      }
    },
    methods: {
      //supprime un restaurant du tableau au clic
      deleteItem(index) {
        this.restaurants.splice(index, 1);
      },
      //calcul la moyenne de chaque restaurant 
      calcMoyenne(array) {
        var total = 0,
          moyenne = 0,
          length = array.length;

        for (var i = 0; i < length; i++) {
          total += parseInt(array[i].rating);
        }
        moyenne = total / length
        return Math.round(moyenne)
      },
      //affiche l'ensemble des commentaire
      showAllCommentary(){
          if(this.showCommentaryisOpen != true){
              this.showCommentaryisOpen = true
          } else if (this.showCommentaryisOpen == true){
              this.showCommentaryisOpen = false
          }
      },
      //ouvre l'ajout de commentaire
      showAddCommentary() {
        if (this.addCommentaryisOpen != true) {
          this.addCommentaryisOpen = true
        } else if (this.addCommentaryisOpen == true)
          this.addCommentaryisOpen = false;
      },
      //recupère la note de l'utilisateur
      setRatingUser(rating) {
        this.ratingUser = rating;
      },
      //ajoute un commentaire au clic
      addCommentary(index) {
        this.restaurants[index].commentaires.push({
          user: this.nameUser,
          content: this.commentaryUser,
          rating: this.ratingUser
        })
        this.restaurants[index].averageRating = this.calcMoyenne(this.restaurants[index].commentaires)
        this.addCommentaryisOpen = false
        this.nameUser = ''
        this.ratingUser = 0
        this.commentaryUser = ''
      },
      //recupère la note globale du restaurant
      setAverageRating(rating) {
        this.averageRating = rating;
      },
    },
  }

</script>

<style>
  /* styles des cartes restaurant */
  .card-header {
    background: rgba(120, 238, 163, 1) !important;
    color: white !important;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .card-header h6 {
    margin-right: auto;
  }

  .card-header .delete-item {
    cursor: pointer;
  }

  .card-title {
    margin-bottom: 25px;
  }

  .badge {
    font-weight: 500;
    letter-spacing: 0.5px;
    opacity: 0.9;
  }

  .rating-section {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .total-commentary {
    margin: 5px 0 0 5px;
  }

  /* fin de styles des cartes restaurant */
  /* styles ajout de commentaire */
  .add-commentary {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .add-commentary .rating-commentary {
    position: relative;
    top: -5px;
    margin-left: 20px;
  }

  .add-commentary #inputNomUser {
    width: 30%;
    height: 25px;
  }

  .add-commentary .btn {
    margin-top: 10px;
    background: rgba(120, 238, 163, 1);
    border: none;
  }

  /* fin de style ajout de commentaire */
  /* Effet transition pour afficher tous le formulaire d'ajout commentaire */
.fade-enter-active, .fade-leave-active {
  transition: opacity .7s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/* Effet transition pour afficher tous le formulaire d'ajout commentaire */
/* styles des tags restaurants */
.tag-section,
.badge {
  display: inline-block;
  margin-left: 5px;
}
.badge {
  color: white;
  letter-spacing: 0.7px;
}
.try {
  background-color: #0984e3;
}
.friends{
  background-color: #6c5ce7;
}
.asian{
  background-color: #d63031;
}
.italian{
  background-color: #2ecc71;
}
.french{
  background-color: #ff7675;
}
.burger{
  background-color: #e67e22;
}
.vegan{
  background-color: #00b894;
}
/* fin de styles des tags restaurants */
</style>
