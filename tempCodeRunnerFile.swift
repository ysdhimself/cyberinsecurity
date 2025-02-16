import requests

url = "https://apidojo-forever21-v1.p.rapidapi.com/products/v2/list"

querystring = {
    "pageSize": "48",
    "pageNumber": "1",
    "sortby": "0",
    "filterColor": "BLACK",
    "filterSize": "XS/S"
}

headers = {
    "x-rapidapi-key": "0fd8b684bamsh2955ee92027c93cp1217c7jsn924b1f14f146",
    "x-rapidapi-host": "apidojo-forever21-v1.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

if response.status_code == 200:
    print(response.json())  # Print the JSON response with Forever21 products
else:
    print("Error:", response.status_code, response.text)
