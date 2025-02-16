import webbrowser
from firebaseHandler import initialize_firestore, save_product
from utils import extract_color
from forever21 import get_forever21_products
from escuela import get_escuela_products
# from walmart import get_walmart_products

# Firebase Initialization
db = initialize_firestore(service_key_path="../serviceKey.json")

user_query = input("Enter a product: ")
detected_color = extract_color(user_query)

# Retrieve products from each store
forever21_products = get_forever21_products(user_query, detected_color)
escuela_products = get_escuela_products(user_query)
# walmart_products = get_walmart_products(user_query)

def display_product(product):
    """
    Display product details and open the image URL in the default web browser.
    """
    if product:
        print("\n----------------------------")
        print(f"Store: {product.get('store', 'N/A')}")
        print(f"Title: {product.get('title', 'N/A')}")
        if product.get("type"):
            print(f"Type: {product.get('type', 'N/A')}")
        print(f"Price: ${product.get('price', 'N/A')}")
        if product.get("sale_price") and product.get("sale_price") != "N/A":
            print(f"Sale Price: ${product.get('sale_price', 'N/A')}")
        print(f"Product URL: {product.get('product_url', 'N/A')}")
        print(f"Image URL: {product.get('image_url', 'N/A')}")
        webbrowser.open(product.get("image_url", ""))
    else:
        print("No product information to display.")

# Display and save Forever21 products
for prod in forever21_products:
    display_product(prod)
    doc_ref = save_product(db, prod)
    print("Forever21 product saved with document ID:", doc_ref.id)

# Display and save EscuelaJS products
for prod in escuela_products:
    display_product(prod)
    doc_ref = save_product(db, prod)
    print("EscuelaJS product saved with document ID:", doc_ref.id)

# Display and save Walmart products
'''
for prod in walmart_products:
    display_product(prod)
    doc_ref = save_product(db, prod)
    print("Walmart product saved with document ID:", doc_ref.id)
'''