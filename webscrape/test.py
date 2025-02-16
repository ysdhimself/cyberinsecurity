import requests
from IPython.display import display, Image
import webbrowser

url = "https://apidojo-forever21-v1.p.rapidapi.com/products/search"
query = input("Enter a product: ")

# querystring = {"query": query, "rows": "1", "start": "0", "color_groups": "black"}
querystring = {"query": query, "rows": "1", "start": "0"}

headers = {
    "x-rapidapi-key": "0fd8b684bamsh2955ee92027c93cp1217c7jsn924b1f14f146",
    "x-rapidapi-host": "apidojo-forever21-v1.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

if response.status_code == 200:
    data = response.json()
    
    if "response" in data and "docs" in data["response"] and data["response"]["docs"]:
        item = data["response"]["docs"][0]  # First item in the response
        clothing_info = {
            "title": item.get("title", "N/A"),
            "type": item.get("brand", "N/A"),
            "price": item.get("price", "N/A"),
            "sale_price": item.get("sale_price", "N/A"),
            "image_url": item.get("thumb_image", "N/A"),
            "product_url": item.get("url", "N/A")
        }

        # Print clothing details
        print(f"Title: {clothing_info['title']}")
        print(f"Type: {clothing_info['type']}")
        print(f"Price: ${clothing_info['price']}")
        print(f"Sale Price: ${clothing_info['sale_price']}")
        print(f"Product URL: {clothing_info['product_url']}")

        webbrowser.open(clothing_info["image_url"])

    else:
        print("No items found.")
else:
    print("Error:", response.status_code, response.text)
