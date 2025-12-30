import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const VisitsContext = createContext();

export const VisitsProvider = ({ children }) => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      const storedVisits = await AsyncStorage.getItem('visits');
      if (storedVisits) {
        setVisits(JSON.parse(storedVisits));
      }
    } catch (error) {
      console.error("Błąd ładowania wizyt:", error);
    }
  };

  const addVisit = async (visit) => {
    const newVisits = [...visits, visit];
    setVisits(newVisits); 
    try {
      await AsyncStorage.setItem('visits', JSON.stringify(newVisits)); 
    } catch (error) {
      console.error("Błąd zapisywania wizyty:", error);
    }
  };

  const deleteVisit = async (id) => {
    const newVisits = visits.filter((item) => item.id !== id);
    setVisits(newVisits);
    try {
      await AsyncStorage.setItem('visits', JSON.stringify(newVisits));
    } catch (error) {
      console.error("Błąd usuwania wizyty:", error);
    }
  };

  return (
    <VisitsContext.Provider value={{ visits, addVisit, deleteVisit }}>
      {children}
    </VisitsContext.Provider>
  );
};