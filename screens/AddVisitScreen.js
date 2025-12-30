import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';

import { VisitsContext } from '../context/VisitsContext';
import { restaurants } from '../data/restaurants';

export default function AddVisitScreen({ navigation, route }) {
  const { addVisit } = useContext(VisitsContext); 

  const [note, setNote] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [guests, setGuests] = useState('');
  const [rating, setRating] = useState(0); 
  
  const [restaurantName, setRestaurantName] = useState('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  const [isNameLocked, setIsNameLocked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  
  useEffect(() => {
    if (route.params?.restaurant) {
      setRestaurantName(route.params.restaurant.name);
      setSelectedRestaurantId(route.params.restaurant.id);
      setIsNameLocked(true); 
    }
  }, [route.params]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [4, 3], quality: 0.7,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const handleSave = async () => {
    if (!selectedRestaurantId) {
        Alert.alert("Wybierz lokal", "Musisz wybrać restaurację z listy, aby dodać wizytę!");
        return;
    }

    const newVisit = {
      id: Date.now().toString(),
      restaurantId: selectedRestaurantId,
      restaurantName: restaurantName,
      note: note,
      imageUri: imageUri,
      guests: guests,
      rating: rating, 
      date: new Date().toLocaleDateString(),
    };

    await addVisit(newVisit);

    Alert.alert("Sukces", "Wizyta zapisana!");
    navigation.goBack();
  };

  const renderRestaurantOption = ({ item }) => (
    <TouchableOpacity 
      style={styles.modalItem} 
      onPress={() => {
        setRestaurantName(item.name);
        setSelectedRestaurantId(item.id);
        setModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding: 20}}>
      
      <Text style={styles.label}>Miejsce:</Text>
      
      {isNameLocked ? (
        <View style={[styles.selectButton, {backgroundColor: '#f0f0f0'}]}>
           <Text style={[styles.selectButtonText, {color: '#555', fontWeight: 'bold'}]}>
            {restaurantName}
           </Text>
           <Ionicons name="lock-closed" size={16} color="#999" />
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.selectButton} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectButtonText}>
            {restaurantName || "Wybierz z listy..."}
          </Text>
          <Ionicons name="caret-down" size={20} color="#666" />
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Wybierz lokal</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <FlatList 
              data={restaurants}
              keyExtractor={item => item.id}
              renderItem={renderRestaurantOption}
              style={{maxHeight: 400}}
            />
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Twoja ocena:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons 
              name={star <= rating ? "star" : "star-outline"} 
              size={36} 
              color="#FFD700" 
              style={{marginHorizontal: 5}}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Z kim byłeś? (Opcjonalne)</Text>
      <View style={styles.guestsInputContainer}>
        <Ionicons name="people-outline" size={20} color="#666" style={{marginRight: 10}} />
        <TextInput
          style={styles.guestsInput}
          placeholder="np. Marek, Kasia"
          value={guests}
          onChangeText={setGuests}
        />
      </View>

      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="camera" size={40} color="#ccc" />
            <Text style={styles.imagePlaceholderText}>Dodaj zdjęcie</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Notatka:</Text>
      <TextInput
        style={styles.input}
        placeholder="Opisz wrażenia..."
        multiline numberOfLines={4}
        value={note} onChangeText={setNote}
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Zapisz w Dzienniku</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  
  input: { 
    backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#eee', 
    borderRadius: 12, padding: 15, fontSize: 16, marginBottom: 20 
  },
  
  selectButton: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc',
    borderRadius: 12, padding: 15, marginBottom: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  selectButtonText: { fontSize: 16, color: '#333' },

  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  modalOverlay: { 
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, 
    padding: 20, maxHeight: '70%' 
  },
  modalHeader: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
    marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  modalItem: { 
    paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', 
    flexDirection: 'row', justifyContent: 'space-between' 
  },
  modalItemText: { fontSize: 16 },

  guestsInputContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', 
    borderWidth: 1, borderColor: '#eee', borderRadius: 12, paddingHorizontal: 15, marginBottom: 20 
  },
  guestsInput: { flex: 1, paddingVertical: 15, fontSize: 16 },
  imageContainer: { height: 200, width: '100%', backgroundColor: '#f0f0f0', borderRadius: 15, overflow: 'hidden', marginBottom: 20, borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed' },
  imagePreview: { width: '100%', height: '100%' },
  imagePlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imagePlaceholderText: { color: '#999', marginTop: 10 },
  saveButton: { backgroundColor: '#FF4500', paddingVertical: 15, borderRadius: 30, alignItems: 'center', elevation: 3, marginTop: 10, marginBottom: 40 },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});