<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="my-modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="my-modal-header" id="modalTitle">
          <slot name="header">
            <h3><i class="fas fa-map-marker-alt" style="color: white;"></i> Ajouter une nouvelle adresse</h3>

            <button type="button" class="btn-close" @click="close" aria-label="Close modal">
              x
            </button>
          </slot>
        </header>
        <section class="my-modal-body" id="modalDescription">
          <slot name="body">
            <form>
              <div class="form-group">
                <label for="inputNomRestau">Nom du restaurant</label>
                <input type="text" class="form-control" id="inputNomRestau" placeholder="Entrer votre nom" v-model="nom">
              </div>
              <div class="form-group">
                <label for="inputAdresseRestau">Adresse du restaurant</label>
                <input type="text" class="form-control" id="inputAdresseRestau" :value="initialadresse">
              </div>
              <div class="form-group">
                <star-rating v-bind:increment="1" inactive-color="#c8d6e5" active-color="#78eea3" border-color="#78eea3"
                  @rating-selected="setRating" :star-size="40" :rating="3">
                </star-rating>
              </div>
              <div class="dropdown-divider"></div>
              <span class="text-muted" v-show="tagSelected.length <= 0">Choisissez au moins un tag ...</span>
              <div class="list-tags-selected" v-for="(tag, index) in tagSelected" :key="tag.class">
                <span class="badge" :class="[tag.class]" @click="deleteTag(index)">{{ tag.content }}</span>
              </div>
              <div class="dropdown-divider"></div>
              <div class="list-tags-available" v-for="(tag, index) in tags" :key="tag.class">
                <span class="badge" :class="[tag.class]" @click="addTag(index)">{{ tag.content }}</span>
              </div>
              <div class="form-group">
                <label for="textAreaComment">Ajouter un commentaire : </label>
                <textarea class="form-control" id="textAreaComment" rows="3" v-model="commentaire"></textarea>
              </div>
            </form>
          </slot>
        </section>
        <footer class="my-modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-red" @click="close" aria-label="Close modal">
              Fermer
            </button>
            <button type="submit" class="btn btn-green" @click.prevent="addRestaurant">Ajouter</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>


<script>
  import store from './RestaurantStore'
  import MapComponent from './MapComponent'
  import StarRating from 'vue-star-rating'

  export default {
    name: 'ModalComponent',
    props: ['initialadresse', 'initialposition'],
    components: {
      StarRating
    },
    data() {
      return {
        restaurants: store.restaurants,
        mainUser: store.mainUser,
        nom: '',
        commentaire: '',
        rating: 0,
        tagSelected: [],
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
      //ferme le modal
      close() {
        this.$emit('close');
      },
      //ajoute un restaurant suivant les données formulaire
      addRestaurant() {
        this.restaurants.push({
            position: this.position,
            nom: this.nom,
            adresse: this.adresse,
            averageRating: this.rating,
            tags: this.tagSelected,
            commentaires: [{
              user: this.mainUser,
              content: this.commentaire,
              rating: this.rating
            }]
          })
          this.nom = ''
          this.adresse = ''
          this.rating = 0
          this.tagSelected = []
          this.commentaire = ''
          this.close()
      },
      //recupère la note de l'utilisateur
      setRating(rating) {
        this.rating = rating;
      },
      //ajoute un tag au tableau des tags séléctionnés
      addTag(idx){
        this.tagSelected.push(this.tags[idx])
      },
      //supprime un tag du tableau des tags séléctionnés
      deleteTag(idx) {
        this.tagSelected.splice(idx, 1);
      },
    },
    computed: {
      //recupère l'adresse du clic utilisateur sur la map avec la props
      adresse() {
        return this.initialadresse
      },
      //recupère la position du clic utilisateur sur la map avec la props
      position() {
        return this.initialposition[this.initialposition.length - 1].position
      }
    }
  };

</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(120, 238, 163, 0.5) !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .my-modal {
    position: fixed;
    display: flex;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    overflow: hidden;
    flex-direction: column;
    width: 600px;
    border-radius: 5px;
  }

  .my-modal-header,
  .my-modal-footer {
    padding: 15px;
    display: flex;
  }

  .my-modal-header {
    border-bottom: 1px solid #eeeeee;
    color: white;
    background: #78eea3;
    justify-content: center;
  }

  .my-modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .my-modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: relative;
    top: -15px;
    left: 60px;
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: white;
    background: transparent;
    align-content: flex-end;
  }

  .btn-green {
    color: white !important;
    background: rgba(120, 238, 163, 1) !important;
    border: 1px solid rgba(120, 238, 163, 1) !important;
    border-radius: 5px;
    margin-left: 40px;
  }
  .btn-red{
    color: white !important;
    background: rgba(235, 77, 75, 1) !important;
    border: 1px solid rgba(235, 77, 75, 1) !important;
    border-radius: 5px;
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
  /* styles des tags dans le modal */
  .dropdown-divider{
    margin-top : 30px;
    margin-bottom: 30px;
  }
  .list-tags-available,
  .list-tags-selected {
    display: inline-block;
  }
  .list-tags-available{
    margin-bottom: 20px;
  }
  .list-tags-available,
  .list-tags-selected .badge {
    cursor: pointer;
    margin-left: 5px;
  }
  .list-tags-selected .badge:before{
    content: 'X';
    font-size: 10px;
    font-weight: 600;
    padding: 2px;
  }
  /* fin de style des tags */

</style>
