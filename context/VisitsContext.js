import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const VisitsContext = createContext();

export const VisitsProvider = ({ children }) => {
  const [visits, setVisits] = useState([]);
  const [favorites, setFavorites] = useState([]); 

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedVisits = await AsyncStorage.getItem('visits');
      if (storedVisits) setVisits(JSON.parse(storedVisits));

      const storedFavs = await AsyncStorage.getItem('favorites');
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
      
    } catch (error) {
      console.error("Błąd ładowania danych:", error);
    }
  };

  const addVisit = async (visit) => {
    const newVisits = [...visits, visit];
    setVisits(newVisits); 
    await AsyncStorage.setItem('visits', JSON.stringify(newVisits)); 
  };

  const deleteVisit = async (id) => {
    const newVisits = visits.filter((item) => item.id !== id);
    setVisits(newVisits);
    await AsyncStorage.setItem('visits', JSON.stringify(newVisits));
  };

  const toggleFavorite = async (restaurantId) => {
    let newFavs;
    if (favorites.includes(restaurantId)) {
      newFavs = favorites.filter(id => id !== restaurantId);
    } else {
      newFavs = [...favorites, restaurantId];
    }
    setFavorites(newFavs);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  return (
    <VisitsContext.Provider value={{ visits, favorites, addVisit, deleteVisit, toggleFavorite }}>
      {children}
    </VisitsContext.Provider>
  );
};