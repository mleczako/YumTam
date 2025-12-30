import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { VisitsContext } from '../context/VisitsContext';

export default function JournalScreen({ navigation }) {
  const { visits, deleteVisit } = useContext(VisitsContext);

  const reversedVisits = visits ? visits.slice().reverse() : [];

  const handleDelete = (id) => {
    Alert.alert(
      "Usuń wpis",
      "Czy na pewno chcesz usunąć to wspomnienie?",
      [
        { text: "Anuluj", style: "cancel" },
        { text: "Usuń", style: "destructive", onPress: () => deleteVisit(id) }
      ]
    );
  };

  const renderVisitItem = ({ item }) => (
    <View style={styles.card}>
      {item.imageUri && (
        <Image source={{ uri: item.imageUri }} style={styles.image} />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{flex: 1}}>
            <Text style={styles.restaurantName}>{item.restaurantName}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        {item.rating > 0 && (
           <View style={styles.ratingRow}>
             {[...Array(5)].map((_, i) => (
               <Ionicons 
                 key={i} 
                 name={i < item.rating ? "star" : "star-outline"} 
                 size={14} 
                 color="#FFD700" 
               />
             ))}
           </View>
        )}

        {item.guests ? (
          <View style={styles.row}>
            <Ionicons name="people-outline" size={16} color="#666" />
            <Text style={styles.guestsText}>{item.guests}</Text>
          </View>
        ) : null}

        {item.note ? (
          <Text style={styles.note}>{item.note}</Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Twój Dziennik</Text>

      {reversedVisits.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="book-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Twój dziennik jest pusty.</Text>
          <Text style={styles.emptySubText}>Dodaj pierwszą wizytę!</Text>
        </View>
      ) : (
        <FlatList
          data={reversedVisits}
          keyExtractor={(item) => item.id}
          renderItem={renderVisitItem}
          contentContainerStyle={{ paddingBottom: 100 }} 
        />
      )}

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddVisit')}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#eee',
  },
  content: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  guestsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  note: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
  },
  emptySubText: {
    color: '#999',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90, 
    backgroundColor: '#FF4500',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});