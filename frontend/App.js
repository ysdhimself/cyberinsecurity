// App.js
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
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SwiperComponent from "./src/swiper.js";
import Cart from './src/Cart.js';

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
  const [cart, setCart] = useState([]); // Cart state to track liked items
  const [cartVisible, setCartVisible] = useState(false); // Controls cart modal visibility

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

  // Function to add an item to the cart when swiped right
  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
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
        // Grid of placeholder images when no prompt is entered
        <View style={styles.gridContainer}>
          <Image source={{ uri: F21_IMAGES[0] }} style={[styles.placeholderItem, styles.bigItem]} />
          <View style={styles.columnContainer}>
            <Image source={{ uri: F21_IMAGES[1] }} style={styles.placeholderItem} />
            <Image source={{ uri: F21_IMAGES[2] }} style={styles.placeholderItem} />
          </View>
          <Image source={{ uri: F21_IMAGES[3] }} style={styles.placeholderItem} />
          <Image source={{ uri: F21_IMAGES[4] }} style={styles.placeholderItem} />
        </View>
      ) : (
        // Pass the addToCart function to the SwiperComponent
        <SwiperComponent query={prompt} addToCart={addToCart} />
      )}

      {/* Navigation Bar with Cart Icon */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => {
          setPrompt('');
          setShowSwiper(false);
        }}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartIcon} onPress={() => setCartVisible(true)}>
          <Ionicons name="bookmark-outline" size={24} color="black" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      {/* Render the Cart modal */}
      <Cart visible={cartVisible} cartItems={cart} onClose={() => setCartVisible(false)} />

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
  cartIcon: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 12,
  },
});
