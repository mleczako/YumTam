import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { restaurant } = route.params;

  const handleAddVisit = () => {
    navigation.navigate('AddVisit', { restaurant: restaurant });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
        
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{restaurant.name}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ {restaurant.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.cuisine}>{restaurant.cuisine} • {restaurant.address}</Text>
          <Text style={styles.description}>{restaurant.description}</Text>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Menu</Text>
          {restaurant.menu ? (
            restaurant.menu.map((item, index) => (
              <View key={index} style={styles.menuItem}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuPrice}>{item.price} zł</Text>
              </View>
            ))
          ) : (
            <Text style={{color: 'gray'}}>Brak menu w bazie.</Text>
          )}

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Opinie gości </Text>
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewUser}>Marta W.</Text>
              <Text style={{color: '#FFD700'}}>★★★★★</Text>
            </View>
            <Text style={styles.reviewText}>Super klimat i pyszne jedzenie! Polecam.</Text>
          </View>
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewUser}>Tomek K.</Text>
              <Text style={{color: '#FFD700'}}>★★★★☆</Text>
            </View>
            <Text style={styles.reviewText}>Piwo faktycznie tanie, ale głośno.</Text>
          </View>

          <View style={{height: 80}} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddVisit}>
          <Ionicons name="add-circle-outline" size={24} color="white" style={{marginRight: 8}} />
          <Text style={styles.addButtonText}>Dodaj wizytę tutaj</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImage: { width: '100%', height: 250 },
  content: { padding: 20, borderTopLeftRadius: 25, borderTopRightRadius: 25, marginTop: -20, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', flex: 1, marginRight: 10 },
  ratingBadge: { backgroundColor: '#FF4500', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  ratingText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  cuisine: { color: 'gray', fontSize: 14, marginTop: 5, marginBottom: 10 },
  description: { fontSize: 16, color: '#444', lineHeight: 22 },
  separator: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
  menuName: { fontSize: 16, fontWeight: '500' },
  menuPrice: { fontSize: 16, fontWeight: 'bold', color: '#FF4500' },
  reviewItem: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 12, marginBottom: 10 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  reviewUser: { fontWeight: 'bold' },
  reviewText: { color: '#555', fontStyle: 'italic' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'rgba(255,255,255,0.9)', borderTopWidth: 1, borderTopColor: '#eee' },
  addButton: { backgroundColor: '#FF4500', paddingVertical: 15, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  addButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});