<template>
  <div class="row map-row">
    <div class="col-12">
      <h2 class="text-muted">
        <i class="fas fa-map-marker-alt fa-2x" style="color: #78eea3;"></i> Ajoutez vos
        restaurants préférés en cliquant sur la carte :
      </h2>
    </div>
    <div class="col-4">
      <ListRestaurant />
    </div>
    <div class="col-8">
      <GmapMap
        id="my-google-map"
        :center="{lat:currentLocation.lat, lng:currentLocation.lng}"
        :zoom="10"
        map-type-id="roadmap"
        style="width: 100%; height: 850px"
        ref="map"
        @click="clickMap"
      >
        <GmapMarker
          :key="index"
          v-for="(marker, index) in restaurants"
          :position="marker.position"
          :clickable="true"
          :draggable="true"
          @click="toggleInfoWindow(marker, index)"
        />

        <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen=false"
        >
          <h3>{{nameMarker}}</h3>
          <br />
          <p>{{adresseMarker}}</p>
          <div class="list-tags-marker" v-for="tag in tagsMarker" :key="tag.class">
            <span class="badge" :class="[tag.class]">{{ tag.content }}</span>
          </div>
          <star-rating
            :star-size="20"
            inactive-color="#c8d6e5"
            active-color="#78eea3"
            border-color="#78eea3"
            :rating="calcMoyenne(currentMidx)"
            :read-only="true"
            :show-rating="false"
          ></star-rating>
          <p>({{ numberCommentary(currentMidx) }} avis)</p>
        </gmap-info-window>
      </GmapMap>
      <div class="col-12">
        <additional-restaurant
          :onClick="getNearByPlaces"
          :additionalRestaurants="additionalRestaurants"
        />
      </div>
    </div>
    <ModalComponent
      v-show="isModalVisible"
      @close="closeModal"
      :initialadresse="formattedAdress"
      :initialposition="newMarker"
    />
  </div>
</template>

<script>
import Vue from "vue";
import store from "./RestaurantStore";
import ModalComponent from "./ModalComponent";
import ListRestaurant from "./ListRestaurant";
import AdditionalRestaurant from "./AdditionalRestaurant";
import StarRating from "vue-star-rating";

export default {
  name: "MapComponent",
  components: {
    ModalComponent,
    ListRestaurant,
    AdditionalRestaurant,
    StarRating
  },

  data() {
    return {
      currentLocation: {
        lat: 48.852969123136646,
        lng: 2.349872589111328
      },
      newMarker: [],
      clickAdresse: null,
      isModalVisible: false,
      restaurants: store.restaurants,
      additionalRestaurants: [],
      nameMarker: "",
      adresseMarker: "",
      tagsMarker: [],
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: 0,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      placesService: ""
    };
  },

  methods: {
    //ouvre le modal
    showModal() {
      this.isModalVisible = true;
    },

    //ferme le modal
    closeModal() {
      this.isModalVisible = false;
    },

    //centre la map suivant la geolocalisation du navigateur
    geolocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    //Affiche les infos dans la bulle du marker
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.nameMarker = marker.nom;
      this.adresseMarker = marker.adresse;
      this.tagsMarker = marker.tags;
      //check si l'index est égal au marker selectionné, si oui, affiche la bulle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //si le marker est différent, upload la bulle et reset l'index du marker actuel
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    //retourne la moyenne des notes pour chaque restaurant, renvoie 0 si le tableau n'existe pas
    calcMoyenne(idx) {
      if (
        this.restaurants.length > 0 &&
        Array.isArray(this.restaurants[idx].commentaires) != false
      ) {
        return this.restaurants[idx].averageRating;
      } else {
        return 0;
      }
    },
    //renvoie le nombre d'avis pour chaque restaurant, renvoie false si le tableau n'existe pas
    numberCommentary(idx) {
      if (this.restaurants.length > 0) {
        return this.restaurants[idx].commentaires.length;
      } else {
        return 0;
      }
    },
    //transforme les coordonnées GPS en adresse avec l'appel API geocoder
    geocode(mouseArgs) {
      Vue.$geocoder.setDefaultMode("lat-lng");
      Vue.$geocoder.send(mouseArgs, response => {
        this.clickAdresse = response;
      });
    },
    //Recupère les coordonnées GPS au clic utilisateur sur la map
    getPosition(mouseArgs) {
      this.newMarker.push({
        position: {
          lat: mouseArgs.latLng.lat(),
          lng: mouseArgs.latLng.lng()
        }
      });
    },
    //Appel les différentes fonctions au click utilisateur sur la map
    clickMap(mouseArgs) {
      this.showModal();
      this.getPosition(mouseArgs);
      this.geocode(this.newMarker[this.newMarker.length - 1].position);
    },

    //méthodes de l'API places
    getNearByPlaces(place) {
      this.additionalRestaurants = [];
      var request = {
        location: place.geometry.location,
        radius: 200,
        type: ["restaurant"]
      };
      var self = this;
      self.placesService.nearbySearch(request, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log(results);
          self.nearByPlaces = results;
          self.getDataByPlaces(results);
        }
      });
    },

    getDataByPlaces(data) {
      data.forEach(element => {
        this.additionalRestaurants.push({
          position: element.geometry.location.toJSON(),
          nom: element.name,
          adresse: element.vicinity,
          averageRating: Math.round(element.rating),
          ratingsTotal: element.user_ratings_total,
          photoSrc:
            typeof element.photos !== "undefined"
              ? element.photos[0].getUrl({ maxWidth: 300, maxHeight: 150 })
              : "" //si pas de photo
        });
      });
    }
  },

  mounted() {
    var self = this;
    self.$refs.map.$mapPromise.then(function() {
      self.map = self.$refs.map.$mapObject;
      self.$gmapApiPromiseLazy().then(function() {
        self.bounds = new google.maps.LatLngBounds();
        self.placesService = new google.maps.places.PlacesService(self.map);
      });
    });
    //centre la map suivant la geolocalisation du navigateur
    this.geolocation();
    console.log(process.env.API_KEY);
  },

  computed: {
    //recupère l'adresse du click utilisateur dans le tableau clickAdresse
    formattedAdress() {
      if (this.clickAdresse != null) {
        return this.clickAdresse.results[0].formatted_address;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.map-row {
  margin-top: 100px;
  margin-bottom: 50px;
}

h2 {
  text-align: center;
  margin-bottom: 100px;
  font-size: 25px;
}

#modal-header {
  background: #78eea3;
}

.list-tags-marker {
  display: inline-block;
}
</style>
