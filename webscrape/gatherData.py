# Testing SHEIN webscraping
# https://www.searchapi.io/api/v1/search?api_key=YOUR_API_KEY

import requests
from bs4 import BeautifulSoup

pkey = "qu487pze9nNhvZEY2sz7xgPu"

# url = "https://www.searchapi.io/api/v1/search"
url = "https://apidojo-forever21-v1.p.rapidapi.com/products/v2/list"

query = "shirt"
engine = "google"

params = {
  "engine": engine,
  "q": query,
  "api_key": pkey
}

response = requests.get(url, params=params)
print(response.text)
