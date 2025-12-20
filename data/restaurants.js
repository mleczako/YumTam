// data/restaurants.js

export const restaurants = [
  {
    id: '1',
    name: 'Pijalnia Wódki i Piwa',
    cuisine: 'Bar / Przekąski',
    rating: 4.2,
    address: 'Rynek 13, Wrocław',
    beerPrice: 9, 
    image: 'https://bi.im-g.pl/im/25/71/16/z23533861Q,Pijalnia-Wodki-i-Piwa.jpg', 
    description: 'Klasyk. Tanio, głośno i w samym sercu Rynku.',
    coordinates: { latitude: 51.1095, longitude: 17.0322 } // Rynek
  },
  {
    id: '2',
    name: 'Iggy Pizza',
    cuisine: 'Włoska',
    rating: 4.8,
    address: 'Kuźnicza 10, Wrocław',
    beerPrice: 18, 
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/35/6d/da/iggy-pizza.jpg',
    description: 'Najlepsza neapolitańska pizza w mieście.',
    coordinates: { latitude: 51.1130, longitude: 17.0335 } // Kuźnicza
  },
  {
    id: '3',
    name: 'Pasibus',
    cuisine: 'Burgery',
    rating: 4.6,
    address: 'Świdnicka 11, Wrocław',
    beerPrice: 14,
    image: 'https://galeriadominikanska.pl/wp-content/uploads/2020/06/Pasibus-1.jpg',
    description: 'Wrocławski klasyk burgerowy.',
    coordinates: { latitude: 51.1085, longitude: 17.0310 } // Świdnicka
  },
  {
    id: '4',
    name: 'Przedwojenna',
    cuisine: 'Bar / Tatar',
    rating: 4.4,
    address: 'Św. Mikołaja 81, Wrocław',
    beerPrice: 9, 
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/6f/9b/38/photo1jpg.jpg',
    description: 'Klimat dawnego Wrocławia, tatar za grosze.',
    coordinates: { latitude: 51.1115, longitude: 17.0290 } // Św. Mikołaja
  },
  {
    id: '5',
    name: 'Panczo',
    cuisine: 'Meksykańska',
    rating: 4.7,
    address: 'Św. Antoniego 35',
    beerPrice: 16,
    image: 'https://wroclaw.smakiwarta.pl/wp-content/uploads/2018/09/Panczo-Wroc%C5%82aw-1.jpg',
    description: 'Tex-mex w najlepszym wydaniu.',
    coordinates: { latitude: 51.1090, longitude: 17.0280 } // Św. Antoniego
  }
];