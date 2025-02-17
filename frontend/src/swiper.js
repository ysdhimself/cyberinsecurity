import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import TinderCard from 'react-tinder-card';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    color: '#000',
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    width: '90%',
    maxWidth: 260,
    height: 300,
  },
  card: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 260,
    height: 300,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 20,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    margin: 10,
    color: '#fff',
  },
  infoText: {
    height: 28,
    justifyContent: 'center',
    display: 'flex',
    zIndex: -100,
  }
};

function SwiperComponent({ query, addToCart }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDirection, setLastDirection] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://10.0.2.2:5000/search', {
          params: { query }
        });
        const data = response.data;
        // Combine products from multiple stores
        const combined = [
          ...data.escuelaJS,
          ...data.forever21,
          ...data.walmart,
        ];
        setCards(combined);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  // Called whenever a card is swiped
  const swiped = (direction, card) => {
    console.log('removing:', card.title);
    setLastDirection(direction);
    if (direction === "right") {
      // If swiped right, add the card to the cart
      addToCart(card);
    }
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen!`);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native Tinder Card</Text>
      <View style={styles.cardContainer}>
        {cards.map((card) => (
          <TinderCard
            key={card.product_url}
            onSwipe={(dir) => swiped(dir, card)}
            onCardLeftScreen={() => outOfFrame(card.title)}
          >
            <View style={styles.card}>
              <ImageBackground
                style={styles.cardImage}
                source={{ uri: card.image_url }}
              >
                <Text style={styles.cardTitle}>{card.title}</Text>
              </ImageBackground>
            </View>
          </TinderCard>
        ))}
      </View>
      {lastDirection ? (
        <Text style={styles.infoText}>You swiped {lastDirection}</Text>
      ) : (
        <Text style={styles.infoText} />
      )}
    </View>
  );
}

export default SwiperComponent;
