import requests
import time
import os
from dotenv import load_dotenv

load_dotenv()

_cache = {
    "data": None,
    "timestamp": 0
}
CACHE_DURATION = 300  # 5 minutes

def fetch_flight_data(limit=200):
    global _cache
    now = time.time()
    
    if _cache["data"] and (now - _cache["timestamp"] < CACHE_DURATION):
        print(f"[CACHE] Returning cached flight data (age: {int(now - _cache['timestamp'])}s)")
        return _cache["data"]

    url = "http://api.aviationstack.com/v1/flights"
    params = {
        "access_key": os.getenv("AVIATIONSTACK_API_KEY"),
        "limit": limit
    }

    try:
        response = requests.get(url, params=params, timeout=15)
        print(f"[DEBUG] AviationStack Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json().get("data", [])
            if not data:
                print("[WARNING] API returned empty data list. Using mock data.")
                return get_mock_data()
            print(f"[DEBUG] Fetched {len(data)} items from AviationStack")
            _cache["data"] = data
            _cache["timestamp"] = now
            return data
        else:
            print(f"[ERROR] API returned {response.status_code}: {response.text}")
            return get_mock_data()
    except Exception as e:
        print(f"[ERROR] Failed to fetch flight data: {e}")
        return get_mock_data()

def get_mock_data():
    """Fallback data when API limits are reached."""
    return [
        {"flight_date": "2025-08-06", "flight_status": "active", 
         "departure": {"iata": "DEL", "airport": "Indira Gandhi International", "scheduled": "2025-08-06T10:00:00+00:00", "country": "India"},
         "arrival": {"iata": "BOM", "airport": "Chhatrapati Shivaji", "country": "India"},
         "airline": {"name": "Air India"}},
        {"flight_date": "2025-08-06", "flight_status": "active", 
         "departure": {"iata": "DXB", "airport": "Dubai International", "scheduled": "2025-08-06T12:00:00+00:00", "country": "UAE"},
         "arrival": {"iata": "LHR", "airport": "London Heathrow", "country": "UK"},
         "airline": {"name": "Emirates"}},
        {"flight_date": "2025-08-06", "flight_status": "active", 
         "departure": {"iata": "JFK", "airport": "John F. Kennedy", "scheduled": "2025-08-06T14:00:00+00:00", "country": "USA"},
         "arrival": {"iata": "SFO", "airport": "San Francisco International", "country": "USA"},
         "airline": {"name": "United Airlines"}},
        {"flight_date": "2025-08-06", "flight_status": "active", 
         "departure": {"iata": "SIN", "airport": "Changi", "scheduled": "2025-08-06T16:00:00+00:00", "country": "Singapore"},
         "arrival": {"iata": "HND", "airport": "Haneda", "country": "Japan"},
         "airline": {"name": "Singapore Airlines"}}
    ] * 25 # Return 100 items
