import React from "react";
import { View, StyleSheet } from "react-native";
import Swiper from "./src/swiper.js"; // Make sure Swiper is exported as a default or named component

export default function App() {
  return (
    <View style={styles.container}>
      <Swiper />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,            // Ensures the container fills the screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});