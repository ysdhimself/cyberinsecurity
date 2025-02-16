import { useState } from 'react';
import { FlatList, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';

const clothingData = [
  { id: '1', image: require('@/assets/images/item1.jpeg'), price: 49.99, rating: 4.5, store: 'Trendy Wear' },
  { id: '2', image: require('@/assets/images/item2.png'), price: 79.99, rating: 4.8, store: 'Fashion Hub' },
  { id: '3', image: require('@/assets/images/item3.jpeg'), price: 29.99, rating: 4.2, store: 'Budget Style' },
];

export default function ClothingApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('relevance');

  const handleSort = (option) => {
    setSortOption(option);
  };

  const sortedData = [...clothingData].sort((a, b) => {
    if (sortOption === 'price') return a.price - b.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0; // Default relevance sorting
  });

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for clothing"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />
      <View style={styles.filterContainer}>
        <Button mode={sortOption === 'price' ? 'contained' : 'outlined'} onPress={() => handleSort('price')}>Price</Button>
        <Button mode={sortOption === 'rating' ? 'contained' : 'outlined'} onPress={() => handleSort('rating')}>Rating</Button>
        <Button mode={sortOption === 'relevance' ? 'contained' : 'outlined'} onPress={() => handleSort('relevance')}>Relevance</Button>
      </View>
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <Text style={styles.store}>{item.store}</Text>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchBar: { marginBottom: 16 },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  card: { flex: 1, margin: 8, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 10, alignItems: 'center' },
  image: { width: 150, height: 200, borderRadius: 8 },
  price: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  store: { fontSize: 14, color: 'gray' },
  rating: { fontSize: 14, marginTop: 4 },
});