import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RestaurantCard({ restaurant, onClose, onDetails }) {
  if (!restaurant) return null;

  return (
    <View style={styles.detailsCard}>
      <Image source={{ uri: restaurant.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{restaurant.name}</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {restaurant.rating}</Text>
          </View>
        </View>
        <Text style={styles.cardCuisine}>{restaurant.cuisine}</Text>
        <Text style={styles.cardDescription} numberOfLines={1}>
          {restaurant.description}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>Piwo: {restaurant.beerPrice} zł</Text>
          
          <TouchableOpacity style={styles.moreButton} onPress={onDetails}>
            <Text style={styles.moreButtonText}>Szczegóły</Text>
            <Ionicons name="arrow-forward" size={14} color="#333" style={{marginLeft: 4}} />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close-circle" size={28} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsCard: {
    position: 'absolute', bottom: 90, left: 20, right: 20,
    backgroundColor: 'white', borderRadius: 16, padding: 12,
    flexDirection: 'row', elevation: 10, shadowColor: '#000',
    shadowOpacity: 0.25, shadowRadius: 10, height: 130, 
  },
  cardImage: { width: 90, height: '100%', borderRadius: 12, backgroundColor: '#eee' },
  cardContent: { flex: 1, marginLeft: 12, justifyContent: 'space-between', paddingVertical: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitle: { fontSize: 15, fontWeight: 'bold', flex: 1, marginRight: 5 },
  ratingBadge: { backgroundColor: '#FF4500', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 8 },
  ratingText: { color: 'white', fontWeight: 'bold', fontSize: 11 },
  cardCuisine: { color: 'gray', fontSize: 11, marginTop: -2, marginBottom: 2 },
  cardDescription: { fontSize: 11, color: '#555', lineHeight: 14 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  cardPrice: { fontWeight: 'bold', fontSize: 12, color: '#333' },
  
  moreButton: { 
    backgroundColor: '#f0f0f0', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  moreButtonText: { fontSize: 11, fontWeight: '600', color: '#333' },
  
  closeButton: { position: 'absolute', top: -8, right: -8, backgroundColor: 'white', borderRadius: 15, padding: 0 }
});