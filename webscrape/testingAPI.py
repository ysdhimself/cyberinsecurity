import requests

url = "https://facebook-scraper3.p.rapidapi.com/page/reviews"

querystring = {"page_id":"100063543614476"}

headers = {
	"x-rapidapi-key": "0fd8b684bamsh2955ee92027c93cp1217c7jsn924b1f14f146",
	"x-rapidapi-host": "facebook-scraper3.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())