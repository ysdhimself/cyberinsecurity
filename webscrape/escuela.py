import requests

def get_escuela_products(user_query, limit=3):
    """
    Retrieve products from EscuelaJS API.
    Filters products based on query keywords.
    Returns a list of product dictionaries.
    """
    url = "https://api.escuelajs.co/api/v1/products"
    response = requests.get(url)
    products = []
    if response.status_code == 200:
        all_products = response.json()
        keywords = user_query.lower().split()
        matching_products = [
            p for p in all_products 
            if all(keyword in p.get("title", "").lower() for keyword in keywords)
        ]
        selected_products = matching_products[:limit] if matching_products else all_products[:limit]
        for p in selected_products:
            product = {
                "store": "EscuelaJS",
                "title": p.get("title", "N/A"),
                "price": p.get("price", "N/A"),
                "image_url": p.get("images")[0] if p.get("images") else "N/A",
                "product_url": f"https://api.escuelajs.co/api/v1/products/{p.get('id')}"
            }
            products.append(product)
    else:
        print("EscuelaJS API Error:", response.status_code, response.text)
    return products
