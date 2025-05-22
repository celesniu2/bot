import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Button, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function PlaceholderScreen({ title }) {
  return (
    <View style={styles.centered}>
      <Text>{title} Coming Soon</Text>
    </View>
  );
}

const PTIScreen = () => <PlaceholderScreen title="PTI Inspection" />;
const AlertsScreen = () => <PlaceholderScreen title="Road & Weather Alerts" />;
const UploadScreen = () => <PlaceholderScreen title="Upload Documents" />;
const ReportScreen = () => <PlaceholderScreen title="Report Issue" />;
const ContactScreen = () => <PlaceholderScreen title="Contact Manager" />;
const NewsScreen = () => <PlaceholderScreen title="Company News" />;
const LeasingScreen = () => <PlaceholderScreen title="Leasing Offers" />;
const NavigationScreen = () => <PlaceholderScreen title="Truck Navigation" />;

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
  { title: '📑 Event Log', screen: 'EventLog' },
];

const mockEvents = [
  { id: 1, type: 'PTI', description: 'PTI Completed', time: '2025-05-20 08:32' },
  { id: 2, type: 'LOAD', description: 'Load Accepted #12345', time: '2025-05-20 09:12' },
  { id: 3, type: 'ROUTE', description: 'Route started to Chicago', time: '2025-05-20 09:33' },
];

function HomeScreen() {
  const navigation = useNavigation();
  const [truckInfo, setTruckInfo] = useState(null);

  useEffect(() => {
    (async () => {
@@ -142,45 +159,53 @@ function TruckSettingsScreen() {
        <Text>🔐 Аутентификация...</Text>
      </View>
    );
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
  card: { padding: 16, backgroundColor: '#fff', borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
});
