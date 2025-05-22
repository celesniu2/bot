import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Button, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function PlaceholderScreen({ route }) {
  return (
    <View style={styles.centered}>
      <Text>{route?.name || 'Экран'} Coming Soon</Text>
    </View>
  );
}

const PTIScreen = (props) => <PlaceholderScreen {...props} />;
const AlertsScreen = (props) => <PlaceholderScreen {...props} />;
const UploadScreen = (props) => <PlaceholderScreen {...props} />;
const ReportScreen = (props) => <PlaceholderScreen {...props} />;
const ContactScreen = (props) => <PlaceholderScreen {...props} />;
const NewsScreen = (props) => <PlaceholderScreen {...props} />;
const LeasingScreen = (props) => <PlaceholderScreen {...props} />;
const NavigationScreen = (props) => <PlaceholderScreen {...props} />;

const menuItems = [
  { title: '📸 PTI Inspection', screen: 'PTI' },
  { title: '🌦 Road & Weather Alerts', screen: 'Alerts' },
  { title: '📤 Upload Documents', screen: 'Upload' },
  { title: '🛠 Report Issue', screen: 'Report' },
  { title: '📞 Contact Manager', screen: 'Contact' },
  { title: '📰 Company News', screen: 'News' },
  { title: '🚛 Leasing Offers', screen: 'Leasing' },
  { title: '📍 Truck Navigation', screen: 'Navigation' },
  { title: '⚙️ Truck Settings', screen: 'TruckSettings' },
  { title: '📑 Event Log', screen: 'EventLog' }
];

const mockEvents = [
  { id: 1, type: 'PTI', description: 'PTI Completed', time: '2025-05-20 08:32' },
  { id: 2, type: 'LOAD', description: 'Load Accepted #12345', time: '2025-05-20 09:12' },
  { id: 3, type: 'ROUTE', description: 'Route started to Chicago', time: '2025-05-20 09:33' }
];

function EventLogScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📑 История Событий</Text>
      {mockEvents.map(event => (
        <View key={event.id} style={styles.eventBox}>
          <Text style={styles.eventType}>🔹 {event.type}</Text>
          <Text>{event.description}</Text>
          <Text style={styles.eventTime}>{event.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function HomeScreen() {
  const navigation = useNavigation();
  const [truckInfo, setTruckInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const height = await AsyncStorage.getItem('height');
      const width = await AsyncStorage.getItem('width');
      const length = await AsyncStorage.getItem('length');
      const weight = await AsyncStorage.getItem('weight');
      const axles = await AsyncStorage.getItem('axles');
      setTruckInfo({ height, width, length, weight, axles });
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🚛 Driver Control Center</Text>
      {truckInfo && (
        <View style={styles.profileBox}>
          <Text style={styles.profileTitle}>Профиль Трака:</Text>
          <Text>📏 Высота: {truckInfo.height} м</Text>
          <Text>📏 Ширина: {truckInfo.width} м</Text>
          <Text>📏 Длина: {truckInfo.length} м</Text>
          <Text>⚖️ Вес: {truckInfo.weight} кг</Text>
          <Text>🚚 Оси: {truckInfo.axles}</Text>
        </View>
      )}
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate(item.screen)}>
          <Text style={styles.menu}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function TruckSettingsScreen() {
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [weight, setWeight] = useState('');
  const [axles, setAxles] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Войти в настройки трака' });
        if (result.success) {
          setAuthenticated(true);
        } else {
          Alert.alert('Отказано', 'Аутентификация не пройдена');
        }
      } else {
        Alert.alert('Нет поддержки', 'Устройство не поддерживает биометрию');
      }
    })();
  }, []);

  useEffect(() => {
    if (authenticated) {
      (async () => {
        const h = await AsyncStorage.getItem('height');
        const w = await AsyncStorage.getItem('width');
        const l = await AsyncStorage.getItem('length');
        const wt = await AsyncStorage.getItem('weight');
        const ax = await AsyncStorage.getItem('axles');
        setHeight(h || '');
        setWidth(w || '');
        setLength(l || '');
        setWeight(wt || '');
        setAxles(ax || '');
      })();
    }
  }, [authenticated]);

  const saveSettings = async () => {
    await AsyncStorage.setItem('height', height);
    await AsyncStorage.setItem('width', width);
    await AsyncStorage.setItem('length', length);
    await AsyncStorage.setItem('weight', weight);
    await AsyncStorage.setItem('axles', axles);
    Alert.alert('✅ Сохранено', 'Параметры трака обновлены');
  };

  if (!authenticated) {
    return <View style={styles.centered}><Text>🔐 Аутентификация...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚙️ Truck Settings</Text>
      <TextInput style={styles.input} placeholder="Высота (м)" value={height} onChangeText={setHeight} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Ширина (м)" value={width} onChangeText={setWidth} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Длина (м)" value={length} onChangeText={setLength} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Вес (кг)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Оси" value={axles} onChangeText={setAxles} keyboardType="numeric" />
      <Button title="Сохранить" onPress={saveSettings} />
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PTI" component={PTIScreen} />
        <Stack.Screen name="Alerts" component={AlertsScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="Leasing" component={LeasingScreen} />
        <Stack.Screen name="Navigation" component={NavigationScreen} />
        <Stack.Screen name="TruckSettings" component={TruckSettingsScreen} />
        <Stack.Screen name="EventLog" component={EventLogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  menu: { fontSize: 18, fontWeight: '600' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  profileBox: { padding: 12, backgroundColor: '#fff', borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
  profileTitle: { fontWeight: 'bold', marginBottom: 4 },
  eventBox: { padding: 10, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  eventType: { fontWeight: '600', marginBottom: 2 },
  eventTime: { color: '#888', fontSize: 12, marginTop: 4 },
  card: { padding: 16, backgroundColor: '#fff', borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' }
});
