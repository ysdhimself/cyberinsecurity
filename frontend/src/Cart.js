// Cart.js
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const Cart = ({ visible, cartItems, onClose }) => {
  // Group cart items by store.
  const groupedItems = cartItems.reduce((groups, item) => {
    const store = item.store || 'Unknown Store';
    if (!groups[store]) {
      groups[store] = [];
    }
    groups[store].push(item);
    return groups;
  }, {});

  // Calculate total price of the cart.
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.header}>Your Cart</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {Object.keys(groupedItems).map((store) => (
            <View key={store} style={styles.storeSection}>
              <Text style={styles.storeHeader}>{store}</Text>
              {groupedItems[store].map((item) => (
                <View key={item.product_url} style={styles.itemContainer}>
                  <Image source={{ uri: item.image_url }} style={styles.image} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>
                      ${parseFloat(item.price).toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: ${totalPrice.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close Cart</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  storeSection: {
    marginBottom: 20,
  },
  storeHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Cart;
