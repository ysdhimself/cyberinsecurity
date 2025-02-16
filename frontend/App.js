import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, Keyboard, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swiper from "./src/swiper.js"; // Make sure Swiper is exported as a default or named component

export default function App() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    setLoading(true);
    Keyboard.dismiss();
    setTimeout(() => setLoading(false), 2000); // Simulate loading
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CleanHaul</Text>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Enter a prompt:" 
          placeholderTextColor="#999"
          value={prompt}
          onChangeText={setPrompt}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.filterIcon}>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" color="#000" style={styles.loader} />}
      <View style={styles.gridContainer}>
        <View style={[styles.placeholderItem, styles.bigItem]} />
        <View style={styles.columnContainer}>
          <View style={styles.placeholderItem} />
          <View style={styles.placeholderItem} />
        </View>
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.placeholderItem} />
        ))}
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity><Ionicons name="home-outline" size={24} color="black" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="bookmark-outline" size={24} color="black" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="person-outline" size={24} color="black" /></TouchableOpacity>
      </View>
      <StatusBar style="auto" />
      <Swiper />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    width: '80%',
    height: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    textAlignVertical: 'center', // Ensures cursor stays in the middle
  },
  filterIcon: {
    marginLeft: 10,
  },
  loader: {
    marginTop: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  placeholderItem: {
    width: 100,
    height: 120,
    backgroundColor: '#DDD',
    borderRadius: 10,
    margin: 5,
  },
  bigItem: {
    width: 210, // Considered as two rows
    height: 250, // Adjusted to fit two rows
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
});

