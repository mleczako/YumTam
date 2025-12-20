import { Ionicons } from '@expo/vector-icons';
import { Platform, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CATEGORIES = [
  { id: 'all', name: 'Wszystkie' },
  { id: 'burger', name: 'Burgery' },
  { id: 'pizza', name: 'Włoska' },
  { id: 'bar', name: 'Bar' },
  { id: 'mexico', name: 'Meksykańska' },
];

export default function DiscoverHeader({ 
  searchText, setSearchText, 
  activeCategory, setActiveCategory, 
  isCheapBeer, setIsCheapBeer 
}) {
  return (
    <View style={styles.topContainer}>
      
      {/* title */}
      <View style={styles.headerRow}>
        <Text style={styles.appName}>YumTam </Text>
        <View style={styles.beerSwitchContainer}>
          <Text style={styles.beerSwitchText}>Piwo {'<'} 10zł</Text>
          <Switch 
            value={isCheapBeer}
            onValueChange={setIsCheapBeer}
            trackColor={{ false: "#ccc", true: "#FF4500" }}
            thumbColor={isCheapBeer ? "#fff" : "#f4f3f4"}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        </View>
      </View>

      {/* search*/}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Szukaj knajpy..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {/* categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesScroll}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity 
            key={cat.id} 
            style={[
              styles.categoryButton, 
              activeCategory === cat.name && styles.categoryButtonActive
            ]}
            onPress={() => setActiveCategory(cat.name)}
          >
            <Text style={[
              styles.categoryText, 
              activeCategory === cat.name && styles.categoryTextActive
            ]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    paddingHorizontal: 20, paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.15,
    shadowRadius: 10, shadowOffset: { width: 0, height: 5 },
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  appName: { fontSize: 22, fontWeight: '800', color: '#FF4500' },
  beerSwitchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff0e6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20,
  },
  beerSwitchText: { fontSize: 12, fontWeight: '600', color: '#FF4500', marginRight: 5 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0',
    borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  categoriesScroll: { flexGrow: 0 },
  categoryButton: {
    paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#ddd', borderRadius: 20, marginRight: 8,
  },
  categoryButtonActive: { backgroundColor: '#333', borderColor: '#333' },
  categoryText: { fontWeight: '600', color: '#333' },
  categoryTextActive: { color: '#fff' },
});