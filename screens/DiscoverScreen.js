import { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import DiscoverHeader from '../components/DiscoverHeader';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';

const CENTER_LAT = 51.1100;
const CENTER_LNG = 17.0325;
const MAX_DELTA = 0.04;

export default function DiscoverScreen() {
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  const [isCheapBeer, setIsCheapBeer] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  const mapRef = useRef(null);

  const displayedRestaurants = restaurants.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = activeCategory === 'Wszystkie' || item.cuisine.includes(activeCategory);
    const matchesBeer = !isCheapBeer || item.beerPrice <= 10;
    return matchesSearch && matchesCategory && matchesBeer;
  });

  useEffect(() => {
    if (selectedRestaurant) {
      const isVisible = displayedRestaurants.find(r => r.id === selectedRestaurant.id);
      
      if (!isVisible) {
        setSelectedRestaurant(null);
      }
    }
  }, [displayedRestaurants]); 

  const handleRegionChange = (region) => {
    const latDiff = Math.abs(region.latitude - CENTER_LAT);
    const lngDiff = Math.abs(region.longitude - CENTER_LNG);
    if (latDiff > MAX_DELTA || lngDiff > MAX_DELTA) {
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: CENTER_LAT,
          longitude: CENTER_LNG,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }, 500);
      }
    }
  };

  return (
    <View style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        onPress={() => {
          setSelectedRestaurant(null);
          Keyboard.dismiss(); 
        }} 
        onRegionChangeComplete={handleRegionChange} 
        initialRegion={{
          latitude: CENTER_LAT,
          longitude: CENTER_LNG,
          latitudeDelta: 0.02, 
          longitudeDelta: 0.02,
        }}
        minZoomLevel={13} 
        maxZoomLevel={20}
        moveOnMarkerPress={false} 
      >
        {displayedRestaurants.map((marker) => (
          <Marker
            key={`${marker.id}-${isCheapBeer}-${activeCategory}-${searchText}`} 
            coordinate={marker.coordinates}
            onPress={(e) => {
              e.stopPropagation();
              setSelectedRestaurant(marker);
            }}
            pinColor={marker.beerPrice <= 10 ? "green" : "red"}
          />
        ))}
      </MapView>

      <DiscoverHeader 
        searchText={searchText}
        setSearchText={setSearchText}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        isCheapBeer={isCheapBeer}
        setIsCheapBeer={setIsCheapBeer}
      />

      <RestaurantCard 
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: { width: '100%', height: '100%' },
});