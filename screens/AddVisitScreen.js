import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
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

import { restaurants } from '../data/restaurants';

export default function AddVisitScreen({ navigation, route }) {
  const [note, setNote] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [guests, setGuests] = useState('');
  
  const [restaurantName, setRestaurantName] = useState('');
  const [isNameLocked, setIsNameLocked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  const [isManualInput, setIsManualInput] = useState(false); 

  useEffect(() => {
    if (route.params?.restaurant) {
      setRestaurantName(route.params.restaurant.name);
      setIsNameLocked(true);
      setIsManualInput(true); 
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
    if (!restaurantName) {
        Alert.alert("Braki", "Musisz wybrać lub wpisać nazwę miejsca!");
        return;
    }

    const newVisit = {
      id: Date.now().toString(),
      restaurantName: restaurantName,
      note: note,
      imageUri: imageUri,
      guests: guests,
      date: new Date().toLocaleDateString(),
    };

    try {
      const existingData = await AsyncStorage.getItem('journal_visits');
      const visits = existingData ? JSON.parse(existingData) : [];
      visits.unshift(newVisit);
      await AsyncStorage.setItem('journal_visits', JSON.stringify(visits));

      Alert.alert("Sukces", "Wizyta zapisana!");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Błąd", "Nie udało się zapisać danych.");
    }
  };

  const renderRestaurantOption = ({ item }) => (
    <TouchableOpacity 
      style={styles.modalItem} 
      onPress={() => {
        setRestaurantName(item.name);
        setModalVisible(false);
        setIsManualInput(true); 
      }}
    >
      <Text style={styles.modalItemText}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding: 20}}>
      
      <Text style={styles.label}>Miejsce:</Text>
      
      {isManualInput ? (
        <View style={{marginBottom: 20}}>
          <TextInput
            style={[styles.input, styles.nameInput, isNameLocked && styles.disabledInput, {marginBottom: 5}]}
            placeholder="Gdzie byłeś?"
            value={restaurantName}
            onChangeText={setRestaurantName}
            editable={!isNameLocked} 
          />
          {!isNameLocked && (
            <TouchableOpacity onPress={() => { setIsManualInput(false); setRestaurantName(''); }}>
              <Text style={{color: '#FF4500', fontSize: 12, textAlign: 'right'}}>
                Powrót do listy
              </Text>
            </TouchableOpacity>
          )}
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
              style={{maxHeight: 300}}
            />

            <TouchableOpacity 
              style={styles.manualOption}
              onPress={() => {
                setModalVisible(false);
                setIsManualInput(true);
                setRestaurantName('');
              }}
            >
              <Ionicons name="pencil" size={18} color="#FF4500" style={{marginRight: 10}} />
              <Text style={styles.manualOptionText}>Inne miejsce (wpisz ręcznie)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5, color: '#333' },
  
  input: { 
    backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#eee', 
    borderRadius: 12, padding: 15, fontSize: 16, marginBottom: 20 
  },
  nameInput: { fontWeight: 'bold', color: '#333' },
  disabledInput: { backgroundColor: '#eee', color: '#555' },
  
  selectButton: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc',
    borderRadius: 12, padding: 15, marginBottom: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  selectButtonText: { fontSize: 16, color: '#333' },

  modalOverlay: { 
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, 
    padding: 20, maxHeight: '60%' 
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
  manualOption: { 
    marginTop: 15, paddingVertical: 15, flexDirection: 'row', 
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff0e6', borderRadius: 12 
  },
  manualOptionText: { color: '#FF4500', fontWeight: 'bold' },

  guestsInputContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', 
    borderWidth: 1, borderColor: '#eee', borderRadius: 12, paddingHorizontal: 15, marginBottom: 20 
  },
  guestsInput: { flex: 1, paddingVertical: 15, fontSize: 16 },
  imageContainer: { height: 200, width: '100%', backgroundColor: '#f0f0f0', borderRadius: 15, overflow: 'hidden', marginBottom: 20, borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed' },
  imagePreview: { width: '100%', height: '100%' },
  imagePlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imagePlaceholderText: { color: '#999', marginTop: 10 },
  saveButton: { backgroundColor: '#FF4500', paddingVertical: 15, borderRadius: 30, alignItems: 'center', elevation: 3, marginTop: 10 },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});