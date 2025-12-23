import { Ionicons } from '@expo/vector-icons';
import { Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DiscoverHeader({ searchText, setSearchText, onOpenFilters, activeFiltersCount }) {
  return (
    <View style={styles.topContainer}>
      
      <Text style={styles.appName}>YumTam</Text>

      <View style={styles.searchRow}>
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

        <TouchableOpacity style={styles.filterButton} onPress={onOpenFilters}>
          <Ionicons name="options" size={24} color="white" />
          {activeFiltersCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    position: 'absolute', top: 0, left: 0, right: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    paddingHorizontal: 20, paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.15,
    shadowRadius: 10, shadowOffset: { width: 0, height: 5 },
  },
  appName: { fontSize: 24, fontWeight: '800', color: '#FF4500', marginBottom: 10 },
  
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  
  searchContainer: {
    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0',
    borderRadius: 12, paddingHorizontal: 10, paddingVertical: 10,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },

  filterButton: {
    backgroundColor: '#333', width: 48, height: 48, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center'
  },
  badge: {
    position: 'absolute', top: -5, right: -5, backgroundColor: '#FF4500',
    width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'white'
  },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' }
});