import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, Image, Keyboard } from 'react-native';
import { BlurView } from 'expo-blur';

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
      <Text style={styles.title}>Enter Prompt</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter a prompt:" 
        placeholderTextColor="#999"
        value={prompt}
        onChangeText={setPrompt}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
      {loading && <ActivityIndicator size="large" color="#000" style={styles.loader} />}
      <View style={styles.imageContainer}>
        <BlurView intensity={50} style={styles.imageWrapper}>
          <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.image} />
        </BlurView>
        <BlurView intensity={50} style={styles.imageWrapperSmall}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.imageSmall} />
        </BlurView>
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
    justifyContent: 'center',
  },
  title: {
    color: '#000',
    fontSize: 16,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  input: {
    width: '80%',
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    textAlignVertical: 'center', // Ensures cursor stays in the middle
  },
  loader: {
    marginTop: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  imageWrapperSmall: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageSmall: {
    width: '100%',
    height: '100%',
  },
});
