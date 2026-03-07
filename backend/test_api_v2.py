import requests
import json

BASE_URL = "http://localhost:5000/api"

endpoints = [
    "/summary",
    "/routes",
    "/airports",
    "/metrics",
    "/flights",
    "/prices?origin=DEL&destination=BOM"
]

def test_endpoints():
    print("🚀 Starting Backend API Tests...\n")
    for endpoint in endpoints:
        url = f"{BASE_URL}{endpoint}"
        try:
            print(f"Testing {url}...")
            response = requests.get(url)
            print(f"Status Code: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Success! Sample data: {json.dumps(data, indent=2)[:200]}...")
            else:
                print(f"❌ Failed! Response: {response.text}")
        except Exception as e:
            print(f"💥 Error: {e}")
        print("-" * 40)

if __name__ == "__main__":
    test_endpoints()
