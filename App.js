import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import DiscoverScreen from './screens/DiscoverScreen';
import JournalScreen from './screens/JournalScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Odkrywaj') iconName = focused ? 'map' : 'map-outline';
            else if (route.name === 'Dziennik') iconName = focused ? 'journal' : 'journal-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF4500',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: { 
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.9)', 
            borderTopWidth: 0,
            elevation: 0
          }
        })}
      >
        <Tab.Screen name="Odkrywaj" component={DiscoverScreen} />
        <Tab.Screen name="Dziennik" component={JournalScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}