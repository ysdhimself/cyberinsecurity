import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, Keyboard, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swiper from "./src/swiper.js"; // Ensure Swiper is correctly imported

export default function App() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [showSwiper, setShowSwiper] = useState(false); // Controls whether Swiper appears

  const handleSubmit = () => {
    setLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      setLoading(false);
      setShowSwiper(prompt.trim() !== ''); // Show Swiper only if input is not empty
    }, 1000); // Simulated loading time
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CleanHaul</Text>
      
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Enter a prompt:" 
          placeholderTextColor="#999"
          value={prompt}
          onChangeText={setPrompt}
          onSubmitEditing={handleSubmit} // Triggers the transition
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.filterIcon}>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#000" style={styles.loader} />}

      {/* Conditionally Render UI */}
      {!showSwiper ? (
        // Show Grid UI when Swiper is NOT active
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
      ) : (
        // Show Swiper when input is submitted
        <Swiper />
      )}

      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity><Ionicons name="home-outline" size={24} color="black" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="bookmark-outline" size={24} color="black" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="person-outline" size={24} color="black" /></TouchableOpacity>
      </View>
      
      <StatusBar style="auto" />
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
    textAlignVertical: 'center',
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
    width: 210,
    height: 250,
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
