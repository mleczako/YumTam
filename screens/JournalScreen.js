import { StyleSheet, Text, View } from 'react-native';

export default function JournalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tutaj będą Twoje wizyty 📸</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff' 
  },
  text: { 
    fontSize: 18, 
    color: '#333' 
  }
});