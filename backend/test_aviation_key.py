import requests

url = "http://api.aviationstack.com/v1/flights"
params = {
    "access_key": "985ad138641e4a0ee42fa7c197bf09ae",
    "limit": 5
}

try:
    print("Testing AviationStack API key...")
    response = requests.get(url, params=params)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
