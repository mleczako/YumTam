import { Ionicons } from '@expo/vector-icons';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { restaurant } = route.params;

  const handleAddVisit = () => {
    navigation.navigate('AddVisit', { restaurant: restaurant });
  };

  const openGoogleMaps = () => {
    if (restaurant.googleMapsUrl) Linking.openURL(restaurant.googleMapsUrl);
    else alert("Brak linku do map w bazie.");
  };

  const openInstagram = () => {
    if (restaurant.instagramUrl) Linking.openURL(restaurant.instagramUrl);
    else alert("Brak Instagrama w bazie.");
  };

  const cuisineText = Array.isArray(restaurant.cuisine) 
    ? restaurant.cuisine.join(', ') 
    : restaurant.cuisine;

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
          
          <Text style={styles.cuisine}>{cuisineText} • {restaurant.address}</Text>
          <Text style={styles.description}>{restaurant.description}</Text>

          <View style={styles.separator} />

          {/* MENU */}
          <Text style={styles.sectionTitle}>Menu</Text>
          {restaurant.menu ? (
            restaurant.menu.map((item, index) => (
              <View key={index} style={styles.menuItem}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuPrice}>{item.price} zł</Text>
              </View>
            ))
          ) : (
            <Text style={{color: 'gray', fontStyle: 'italic'}}>Brak menu w podglądzie.</Text>
          )}

          <View style={styles.separator} />

          {/* OPINIE I SOCIAL MEDIA */}
          <Text style={styles.sectionTitle}>Opinie i Sociale</Text>
          
          <View style={styles.socialContainer}>
            <Text style={styles.reviewLabel}>
              Zobacz więcej zdjęć i opinii ({restaurant.reviewsCount}+):
            </Text>

            {/* Przycisk Google Maps */}
            <TouchableOpacity style={styles.socialButton} onPress={openGoogleMaps}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="logo-google" size={20} color="#4285F4" style={{ marginRight: 10 }} />
                <Text style={styles.socialButtonText}>Opinie Google Maps</Text>
              </View>
              <Ionicons name="arrow-forward" size={16} color="#aaa" />
            </TouchableOpacity>

            {/* NOWY: Przycisk Instagram */}
            <TouchableOpacity style={[styles.socialButton, { marginTop: 10 }]} onPress={openInstagram}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="logo-instagram" size={20} color="#C13584" style={{ marginRight: 10 }} />
                <Text style={styles.socialButtonText}>Profil na Instagramie</Text>
              </View>
              <Ionicons name="arrow-forward" size={16} color="#aaa" />
            </TouchableOpacity>
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
  
  // STYLE DLA SOCIAL MEDIA
  socialContainer: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 12 },
  reviewLabel: { color: '#555', marginBottom: 15 },
  
  socialButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: 'white', 
    padding: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#eee',
    // Cień
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  socialButtonText: { fontWeight: '600', color: '#333' },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'rgba(255,255,255,0.9)', borderTopWidth: 1, borderTopColor: '#eee' },
  addButton: { backgroundColor: '#FF4500', paddingVertical: 15, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  addButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});