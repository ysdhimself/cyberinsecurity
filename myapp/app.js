const express = require('express');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');

// Initialize Firebase Admin SDK (keeping your current settings)
const serviceAccount = require('./config/serviceAccountKey.json'); // adjust path accordingly
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies (still useful for other endpoints)
app.use(express.json());

// Root route for "Hello, world!"
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

/*
 * Route: /search
 * Description: Accepts a plaintext query as a query parameter, scrapes multiple retailers,
 *              and returns the product links found.
 * Example Request: GET /search?query=blue jeans
 */
app.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Query is required.' });
    }

    // Define an array of retailers to scrape.
    // Each retailer contains:
    // - name: a human-readable name
    // - searchUrl: a URL built with the query (update this for each retailer)
    // - linkSelector: a CSS selector to target product links on the search results page
    const retailers = [
      {
        name: 'RetailerOne',
        searchUrl: `https://www.retailerone.com/search?q=${encodeURIComponent(query)}`,
        linkSelector: '.product-item a'  // Update this selector accordingly
      },
      {
        name: 'RetailerTwo',
        searchUrl: `https://www.retailertwo.com/search?q=${encodeURIComponent(query)}`,
        linkSelector: '.item-card a'      // Update this selector accordingly
      }
      // Add additional retailers as needed...
    ];

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const results = [];

    // Iterate over each retailer and scrape the product links
    for (const retailer of retailers) {
      try {
        const page = await browser.newPage();
        await page.goto(retailer.searchUrl, { waitUntil: 'networkidle2' });

        // Wait for the product link elements to appear (adjust timeout if necessary)
        await page.waitForSelector(retailer.linkSelector, { timeout: 5000 });

        // Extract product links from the page
        const links = await page.evaluate((selector) => {
          const nodes = Array.from(document.querySelectorAll(selector));
          return nodes.map(node => node.href).filter(link => link);
        }, retailer.linkSelector);

        results.push({
          retailer: retailer.name,
          links
        });

        await page.close();
      } catch (err) {
        console.error(`Error scraping ${retailer.name}:`, err);
        results.push({
          retailer: retailer.name,
          error: err.message
        });
      }
    }

    await browser.close();
    res.json({ query, results });
  } catch (error) {
    console.error('Error in /search:', error);
    res.status(500).json({ error: error.message });
  }
});

// Existing Firestore-related routes remain unchanged
app.post('/add-item', async (req, res) => {
  try {
    const { collectionName, data } = req.body;
    const docRef = await db.collection(collectionName).add(data);
    res.status(201).json({ id: docRef.id, message: 'Document added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
