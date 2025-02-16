import requests
import webbrowser
from firebaseHandler import initialize_firestore, save_product

# Initialize Firestore (adjust the path to your serviceKey.json as needed)
db = initialize_firestore(service_key_path="../serviceKey.json")

# Prompt user for a product search query
query = input("Enter a product: ")

# ------------------------------
# Forever21 API Call (via RapidAPI)
# ------------------------------
forever21_url = "https://apidojo-forever21-v1.p.rapidapi.com/products/search"
forever21_params = {"query": query, "rows": "1", "start": "0"}
forever21_headers = {
    "x-rapidapi-key": "0fd8b684bamsh2955ee92027c93cp1217c7jsn924b1f14f146",
    "x-rapidapi-host": "apidojo-forever21-v1.p.rapidapi.com"
}

f21_response = requests.get(forever21_url, headers=forever21_headers, params=forever21_params)
forever21_info = {}

if f21_response.status_code == 200:
    data = f21_response.json()
    if "response" in data and "docs" in data["response"] and data["response"]["docs"]:
        item = data["response"]["docs"][0]  # Get the first product
        forever21_info = {
            "store": "Forever21",
            "title": item.get("title", "N/A"),
            "type": item.get("brand", "N/A"),
            "price": item.get("price", "N/A"),
            "sale_price": item.get("sale_price", "N/A"),
            "image_url": item.get("thumb_image", "N/A"),
            "product_url": item.get("url", "N/A")
        }
    else:
        print("No Forever21 items found.")
else:
    print("Forever21 API Error:", f21_response.status_code, f21_response.text)

# ------------------------------
# EscuelaJS API Call
# ------------------------------
escuela_url = "https://api.escuelajs.co/api/v1/products"
escuela_response = requests.get(escuela_url)
escuela_info = {}

if escuela_response.status_code == 200:
    products = escuela_response.json()
    # Filter products by checking if query exists in the product title (case-insensitive)
    matching_products = [p for p in products if query.lower() in p.get("title", "").lower()]
    # If no product matches, fallback to the first product
    escuela_product = matching_products[0] if matching_products else products[0]
    
    # Use the first image from the "images" list if available
    image_url = escuela_product.get("images")[0] if escuela_product.get("images") else "N/A"
    
    escuela_info = {
        "store": "EscuelaJS",
        "title": escuela_product.get("title", "N/A"),
        "price": escuela_product.get("price", "N/A"),
        "image_url": image_url,
        "product_url": f"https://api.escuelajs.co/api/v1/products/{escuela_product.get('id')}"
    }
else:
    print("EscuelaJS API Error:", escuela_response.status_code, escuela_response.text)

# ------------------------------
# Display and Save Results
# ------------------------------
def display_product(product):
    if product:
        print("\n----------------------------")
        print(f"Store: {product.get('store', 'N/A')}")
        print(f"Title: {product.get('title', 'N/A')}")
        if product.get("type"):
            print(f"Type: {product.get('type', 'N/A')}")
        print(f"Price: ${product.get('price', 'N/A')}")
        if product.get("sale_price") and product["sale_price"] != "N/A":
            print(f"Sale Price: ${product.get('sale_price', 'N/A')}")
        print(f"Product URL: {product.get('product_url', 'N/A')}")
        print(f"Image URL: {product.get('image_url', 'N/A')}")
        webbrowser.open(product.get("image_url", ""))
    else:
        print("No product information to display.")

# Display and save Forever21 product
if forever21_info:
    display_product(forever21_info)
    doc_ref = save_product(db, forever21_info)
    print("Forever21 product saved with document ID:", doc_ref.id)

# Display and save EscuelaJS product
if escuela_info:
    display_product(escuela_info)
    doc_ref = save_product(db, escuela_info)
    print("EscuelaJS product saved with document ID:", doc_ref.id)
