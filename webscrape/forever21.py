import requests

def get_forever21_products(user_query, detected_color=None, rows=3):
    """
    Retrieve products from Forever21 based on the user_query.
    Optionally uses detected_color to filter results.
    Returns a list of product dictionaries.
    """
    url = "https://apidojo-forever21-v1.p.rapidapi.com/products/search"
    params = {"query": user_query, "rows": str(rows), "start": "0"}
    if detected_color:
        params["filterColor"] = detected_color.upper()  # API may expect uppercase
    headers = {
        "x-rapidapi-key": "0fd8b684bamsh2955ee92027c93cp1217c7jsn924b1f14f146",
        "x-rapidapi-host": "apidojo-forever21-v1.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=params)
    products = []
    if response.status_code == 200:
        data = response.json()
        if "response" in data and "docs" in data["response"] and data["response"]["docs"]:
            for item in data["response"]["docs"]:
                product = {
                    "store": "Forever21",
                    "title": item.get("title", "N/A"),
                    "type": item.get("brand", "N/A"),
                    "price": item.get("price", "N/A"),
                    "sale_price": item.get("sale_price", "N/A"),
                    "image_url": item.get("thumb_image", "N/A"),
                    "product_url": item.get("url", "N/A")
                }
                products.append(product)
        else:
            print("No Forever21 items found.")
    else:
        print("Forever21 API Error:", response.status_code, response.text)
    return products
