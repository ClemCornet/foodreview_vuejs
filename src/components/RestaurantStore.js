class RestaurantStore {
  constructor() {
    this.restaurants = [{
        nom: 'Bronco',
        adresse: '39 Rue des Petites Écuries, 75010 Paris',
        position: {
          lat: 48.8737815,
          lng: 2.3501649
        },
        averageRating: 4,
        tags: [{class: 'try', content: 'A essayer'},{class: 'friends', content: 'Entre amis'}, {class: 'italian', content: 'Italien'}],
        commentaires: [{
          user: 'Clément',
          content:'Un excellent restaurant, j\'y reviendrai ! Par contre il vaut mieux aimer la viande.',
          rating: 4,
        },{
          user: 'Karim',
          content: 'Tout était parfait ! La nourriture est excellente.',
          rating: 5
        },{
          user: 'Emeline',
          content: 'J\'ai apprécié le dessert, je n\'ai pas aimé le reste.',
          rating: 3
        }],
      }, {
        nom: 'Babalou',
        adresse: '4 Rue Lamarck, 75018 Paris',
        position: {
          lat: 48.8865035,
          lng: 2.3442197
        },
        averageRating: 3,
        tags: [{class: 'friends', content: 'Entre amis'}, {class: 'french', content: 'Français'}, {class: 'vegan', content: 'Vegan'}],
        commentaires: [{
          user: 'Clément',
          content: 'J\'ai trouvé ça correct, sans plus',
          rating: 3
        },
        {
          user: 'Jean-Claude',
          content: 'Superbe restaurant',
          rating: 5
        },
        {
          user: 'Céline',
          content: 'J\'ai tout simplement détesté',
          rating: 1
        },{
          user: 'Lou',
          content: 'Le cadre est super sympa, le service rapide, je recommande !',
          rating: 4
        },{
          user: 'Marie',
          content: 'Service lent, altercation avec le serveur. Nous y retournerons plus jamais',
          rating: 2
        },{
          user: 'Jean-Charles',
          content: 'Correct, sans plus.',
          rating: 3
        },{
          user: 'Camille',
          content: 'L\'entrée était bonne. Le plat et le dessert vraiment moyen.',
          rating: 3
        }],
      }, {
        nom: 'Chez Clément',
        adresse: '106 Boulevard du Montparnasse, 75014 Paris',
        position: {
          lat: 48.842129,
          lng: 2.3286298000000443
        },
        averageRating: 2,
        tags: [{class: 'try', content: 'A essayer'},{class: 'friends', content: 'Entre amis'}, {class: 'burger', content: 'Burger'}, {class: 'vegan', content: 'Vegan'}],
        commentaires: [{
          user: 'Clément',
          content:'Une brasserie dont la nourriture et le service laisse vraiment à désirer.',
          rating: 2
        }],
      }]
    }
    mainUser = 'Clément';
}

export default new RestaurantStore()
