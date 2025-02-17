import React, { useState } from 'react';
import { 
  StatusBar,
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  ActivityIndicator, 
  Keyboard, 
  TouchableOpacity,
  Image // <-- import Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SwiperComponent from "./src/swiper.js";

// 1) Define your image array
const F21_IMAGES = [
  "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw1a82750c/1_front_750/01372754-01.jpg?sh=330",
  "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw1a82750c/1_front_750/00504635-04.jpg?sh=330",
  "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dw1a82750c/1_front_750/01361350-02.jpg?sh=330",
  "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwb0c0a0c5/1_front_750/01312250-01.jpg?sh=330",
  "https://www.forever21.com/dw/image/v2/BFKH_PRD/on/demandware.static/-/Sites-f21-master-catalog/default/dwb0c0a0c5/1_front_750/01287519-01.jpg?sh=330"
];

export default function App() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [showSwiper, setShowSwiper] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    Keyboard.dismiss();

    try {
      const response = await fetch(`http://10.0.2.2:5000/search?query=${encodeURIComponent(prompt)}`);
      const data = await response.json();
      setShowSwiper(prompt.trim() !== '');
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
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
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.filterIcon}>
          <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#000" style={styles.loader} />}

      {!showSwiper ? (
        // 2) Show a grid of images
        <View style={styles.gridContainer}>
          {/* 1st image (Big item) */}
          <Image
            source={{ uri: F21_IMAGES[0] }}
            style={[styles.placeholderItem, styles.bigItem]}
          />
          {/* 2nd & 3rd images in a column */}
          <View style={styles.columnContainer}>
            <Image
              source={{ uri: F21_IMAGES[1] }}
              style={styles.placeholderItem}
            />
            <Image
              source={{ uri: F21_IMAGES[2] }}
              style={styles.placeholderItem}
            />
          </View>
          {/* 4th image */}
          <Image
            source={{ uri: F21_IMAGES[3] }}
            style={styles.placeholderItem}
          />
          {/* 5th image */}
          <Image
            source={{ uri: F21_IMAGES[4] }}
            style={styles.placeholderItem}
          />
        </View>
      ) : (
        // Show Swiper if there's a valid prompt
        <SwiperComponent query={prompt} />
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

// Styles remain the same...
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
    // remove background color if you want only the image
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
