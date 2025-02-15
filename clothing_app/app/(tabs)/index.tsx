import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://your-backend-service.com/search?q=${query}`);
      const data = await response.json();
      setResults(data.items); // Assuming the response has 'items'
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Clothing Search</Text>
      
      <TextInput 
        style={styles.input}
        placeholder="Search for clothing..."
        value={query}
        onChangeText={setQuery}
      />
      
      <Button title="Search" onPress={handleSearch} />
      
      {results.length > 0 && (
        <View style={styles.results}>
          {results.map((item, index) => (
            <Text key={index} style={styles.resultText}>{item.name}</Text> // Assuming the API returns 'name' for each item
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
  results: {
    marginTop: 20,
    width: '80%',
  },
  resultText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
});

export default App;
