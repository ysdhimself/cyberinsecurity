const express = require('express');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./config/serviceAccountKey.json'); // adjust the path accordingly
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get Firestore instance
const db = admin.firestore();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Root route to display "Hello, world!"
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Example route to add a new document to Firestore
app.post('/add-item', async (req, res) => {
  try {
    const { collectionName, data } = req.body;
    // Add a new document with auto-generated ID
    const docRef = await db.collection(collectionName).add(data);
    res.status(201).json({ id: docRef.id, message: 'Document added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example route to read documents from a Firestore collection
app.get('/get-items/:collectionName', async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const snapshot = await db.collection(collectionName).get();
    const items = [];
    snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
