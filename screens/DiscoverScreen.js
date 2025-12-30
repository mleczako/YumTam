import { useContext, useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import DiscoverHeader from '../components/DiscoverHeader';
import FilterModal from '../components/FilterModal';
import RestaurantCard from '../components/RestaurantCard';
import { VisitsContext } from '../context/VisitsContext';
import { restaurants } from '../data/restaurants';

const CENTER_LAT = 51.1100;
const CENTER_LNG = 17.0325;
const MAX_DELTA = 0.02; 

const HIDE_POI_STYLE = [
  { "featureType": "poi.business", "stylers": [{ "visibility": "off" }] },
  { "featureType": "poi.medical", "stylers": [{ "visibility": "off" }] },
  { "featureType": "poi.school", "stylers": [{ "visibility": "off" }] }
];

export default function DiscoverScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  
  const { visits } = useContext(VisitsContext);
  const visitedRestaurantIds = visits.map(v => v.restaurantId).filter(id => id !== null);

  const [selectedCategories, setSelectedCategories] = useState([]); 
  const [isCheapBeer, setIsCheapBeer] = useState(false);
  const [hasLunch, setHasLunch] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  const mapRef = useRef(null);

  const resetFilters = () => {
    setSelectedCategories([]);
    setIsCheapBeer(false);
    setHasLunch(false);
  };

  const getBeerPrice = (restaurant) => {
    if (!restaurant.menu) return 999;
    const beerItem = restaurant.menu.find(m => {
        const name = m.name.toLowerCase();
        return name.includes('piwo') || name.includes('cerveza') || name.includes('lager');
    });
    return beerItem ? beerItem.price : 999;
  };

  const displayedRestaurants = restaurants.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => item.cuisine.includes(cat));
    
    const currentBeerPrice = getBeerPrice(item);
    const matchesBeer = !isCheapBeer || currentBeerPrice <= 10;
    
    const matchesLunch = !hasLunch || item.hasLunch;
    
    return matchesSearch && matchesCategory && matchesBeer && matchesLunch;
  });

  const activeFiltersCount = selectedCategories.length + (isCheapBeer ? 1 : 0) + (hasLunch ? 1 : 0);

  useEffect(() => {
    if (selectedRestaurant) {
      const isVisible = displayedRestaurants.find(r => r.id === selectedRestaurant.id);
      if (!isVisible) setSelectedRestaurant(null);
    }
  }, [displayedRestaurants]);

  const handleRegionChangeComplete = (region) => {
    const latDiff = Math.abs(region.latitude - CENTER_LAT);
    const lngDiff = Math.abs(region.longitude - CENTER_LNG);

    if (latDiff > MAX_DELTA * 1.5 || lngDiff > MAX_DELTA * 1.5) {
      mapRef.current?.animateToRegion({
        latitude: CENTER_LAT,
        longitude: CENTER_LNG,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }, 500); 
    }
  };

  const markersKey = `${isCheapBeer}-${hasLunch}-${selectedCategories.join(',')}-${searchText}`;

  return (
    <View style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={HIDE_POI_STYLE} 
        showsPointsOfInterest={false}
        
        onRegionChangeComplete={handleRegionChangeComplete} 
        
        onPress={() => { setSelectedRestaurant(null); Keyboard.dismiss(); }} 
        initialRegion={{
          latitude: CENTER_LAT, longitude: CENTER_LNG,
          latitudeDelta: 0.02, longitudeDelta: 0.02,
        }}
        minZoomLevel={13} maxZoomLevel={20} moveOnMarkerPress={false} 
      >
        {displayedRestaurants.map((marker) => {
          
          const isVisited = visitedRestaurantIds.includes(marker.id);
          
          const pinColor = isVisited ? "#4CAF50" : "#FF5722";

          return (
            <Marker
              key={`${marker.id}-${markersKey}`} 
              coordinate={marker.coordinates}
              onPress={(e) => { e.stopPropagation(); setSelectedRestaurant(marker); }}
              pinColor={pinColor}
            />
          );
        })}
      </MapView>

      <DiscoverHeader 
        searchText={searchText}
        setSearchText={setSearchText}
        onOpenFilters={() => setModalVisible(true)}
        activeFiltersCount={activeFiltersCount}
      />

      <FilterModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        isCheapBeer={isCheapBeer}
        setIsCheapBeer={setIsCheapBeer}
        hasLunch={hasLunch}
        setHasLunch={setHasLunch}
        onReset={resetFilters} 
      />

      <RestaurantCard 
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onDetails={() => {
          setSelectedRestaurant(null); 
          navigation.navigate('RestaurantDetails', { restaurant: selectedRestaurant });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: { width: '100%', height: '100%' },
});