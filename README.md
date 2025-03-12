# CyberInsecurity
Devpost Link: https://devpost.com/software/cyberinsecurity-cleanhaul
## Overview
CleanHaul is an app designed to scrape the web for clothing descriptions, present them in a swipe-based UI for user interaction, and learn user preferences over time. The project consists of a frontend built with React and a backend server for web scraping and data management.

## Tech Stack
- **Frontend:** React, Swiper.js
- **Backend:** Python, Flask (for web scraping)
- **Database:** TBD (SQLite/PostgreSQL)

## Project Structure
```
cyberinsecurity/
│── frontend/
│   │── src/
│   │   │── components/
│   │   │   └── Card.js    # Component for displaying a clothing item
│   │   └── swiper.js      # Handles swipe-based interactions
│   ├── App.js            # Main entry point for React app
│── webscrape/
│   ├── server.py         # Backend server for web scraping
│── README.md             # Project documentation
```

## Installation
### Prerequisites
- Node.js & npm (for frontend)
- Python 3 & pip (for backend)

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

### Backend Setup
1. Navigate to the `webscrape` directory:
   ```sh
   cd webscrape
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```sh
   python server.py
   ```

## Usage
1. Start both the frontend and backend as described above.
2. Open the React app in the browser at `http://localhost:3000`.
3. Swipe left or right on clothing items.
4. The system will learn from your choices over time.

## Features
- **Web Scraping:** Fetches clothing descriptions dynamically.
- **Swipe-based UI:** Users can like/dislike items via swipes.
- **Preference Learning:** The app adapts to user preferences over time.

## Future Enhancements
- Integration with a recommendation engine.
- User authentication and profile management.
- Persistent database storage for liked/disliked items.

## License
This project is open-source under the MIT License.

---
**Contributors:** 
-----------------------------------
| Name             | Github       |
|------------------|--------------|
| Azim Mukith      | azimukith    |
| Yashdeep Dadiala | ysdhimself   |
| Anusha Srivastav | anunusha     |
| Riya Salian      | salian97     |
| Prateek Annam    | Praticus87   |
-----------------------------------
