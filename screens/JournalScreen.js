import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function JournalScreen({ navigation }) {
  const [visits, setVisits] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadVisits();
    }, [])
  );

  const loadVisits = async () => {
    try {
      const data = await AsyncStorage.getItem('journal_visits');
      if (data) {
        setVisits(JSON.parse(data));
      }
    } catch (error) {
      console.log("Błąd ładowania", error);
    }
  };

  const deleteVisit = async (id) => {
    const newVisits = visits.filter(v => v.id !== id);
    setVisits(newVisits);
    await AsyncStorage.setItem('journal_visits', JSON.stringify(newVisits));
  };

  const renderVisit = ({ item }) => (
    <View style={styles.card}>
      {item.imageUri && (
        <Image source={{ uri: item.imageUri }} style={styles.cardImage} />
      )}
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.restaurantName}>{item.restaurantName}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        {item.guests ? (
          <View style={styles.guestsRow}>
            <Ionicons name="people" size={16} color="#FF4500" style={{marginRight: 5}} />
            <Text style={styles.guestsText}>Z: {item.guests}</Text>
          </View>
        ) : null}

        <Text style={styles.note} numberOfLines={2}>{item.note}</Text>
        
        <TouchableOpacity onPress={() => deleteVisit(item.id)} style={styles.trashBtn}>
          <Ionicons name="trash-outline" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Twój Dziennik</Text>
      </View>

      {visits.length === 0 ? (
        <View style={styles.placeholderContainer}>
          <Ionicons name="book-outline" size={80} color="#ddd" />
          <Text style={styles.placeholderText}>Pusto tu...</Text>
          <Text style={styles.placeholderSubText}>Dodaj pierwsze wspomnienie!</Text>
        </View>
      ) : (
        <FlatList 
          data={visits}
          keyExtractor={item => item.id}
          renderItem={renderVisit}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddVisit')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { 
    paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, 
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' 
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  
  placeholderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 20 },
  placeholderSubText: { fontSize: 16, color: '#999', marginTop: 5 },

  card: { 
    backgroundColor: '#fff', borderRadius: 15, marginBottom: 15, overflow: 'hidden',
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3 
  },
  cardImage: { width: '100%', height: 150 },
  cardContent: { padding: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  restaurantName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  date: { fontSize: 12, color: '#999' },
  note: { fontSize: 14, color: '#555', lineHeight: 20 },
  
  trashBtn: { position: 'absolute', bottom: 10, right: 10 },

  fab: {
    position: 'absolute', width: 60, height: 60, alignItems: 'center', justifyContent: 'center',
    right: 20, bottom: 90, backgroundColor: '#FF4500', borderRadius: 30,
    elevation: 5, shadowColor: '#FF4500', shadowOpacity: 0.4, shadowRadius: 5
  },
  guestsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, 
  },
  guestsText: {
    fontSize: 13,
    color: '#FF4500',
    fontWeight: '600'
  },
});