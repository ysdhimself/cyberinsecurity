import requests
from urllib.parse import quote
from config import API_KEY

def get_walmart_products(user_query, limit=3):
    """
    Retrieve products from Walmart API via RapidAPI.
    Returns a list of product dictionaries.
    """
    url = "https://walmart-data.p.rapidapi.com/walmart-serp.php"
    params = {"url": f"https://www.walmart.com/search?q={quote(user_query)}"}
    headers = {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "walmart-data.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=params)
    products = []
    if response.status_code == 200:
        walmart_data = response.json()
        body = walmart_data.get("body", {})
        items = body.get("products", [])
        for item in items[:limit]:
            # Handle price as dictionary if needed
            price_data = item.get("price")
            if isinstance(price_data, dict):
                price = price_data.get("rawPrice", "N/A")
            else:
                price = item.get("price", "N/A")
            product = {
                "store": "Walmart",
                "title": item.get("title", "N/A"),
                "price": price,
                "image_url": item.get("image", "N/A"),
                "product_url": item.get("link", "N/A")
            }
            products.append(product)
    else:
        print("Walmart API Error:", response.status_code, response.text)
    return products
