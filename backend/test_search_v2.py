import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_search():
    print("🔍 Testing Search/Filter Endpoint...")
    
    # 1. Get all airports first to have valid codes
    print("\nFetching airports...")
    airports_resp = requests.get(f"{BASE_URL}/airports")
    airports = airports_resp.json()
    if not airports:
        print("❌ No airports found. Cannot perform meaningful search test.")
        return
    
    codes = [a['code'] for a in airports[:2]]
    print(f"Sample codes for testing: {codes}")

    # 2. Test filter by departure
    print(f"\nTesting filter by departure = {codes[0]}...")
    resp = requests.get(f"{BASE_URL}/routes/filter", params={"departure": codes[0]})
    print(f"Status: {resp.status_code}")
    routes = resp.json().get('routes', [])
    print(f"Found {len(routes)} routes.")
    if routes:
        print(f"Sample: {routes[0]['route']}")

    # 3. Test filter by arrival
    if len(codes) > 1:
        print(f"\nTesting filter by arrival = {codes[1]}...")
        resp = requests.get(f"{BASE_URL}/routes/filter", params={"arrival": codes[1]})
        print(f"Status: {resp.status_code}")
        routes = resp.json().get('routes', [])
        print(f"Found {len(routes)} routes.")

    # 4. Test filter by date range (mocking some dates)
    # The backend uses datetime.fromisoformat(date)
    # AviationStack dates are usually like "2024-05-20T10:00:00+00:00"
    print("\nTesting filter by date range (2020-01-01 to 2026-01-01)...")
    resp = requests.get(f"{BASE_URL}/routes/filter", params={"start": "2020-01-01", "end": "2026-01-01"})
    print(f"Status: {resp.status_code}")
    routes = resp.json().get('routes', [])
    print(f"Found {len(routes)} routes.")

if __name__ == "__main__":
    test_search()
