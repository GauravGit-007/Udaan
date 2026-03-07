import requests

BASE = "http://127.0.0.1:5000"

def print_title(title):
    print(f"\n{title.upper()}")
    print("=" * 50)

def test_summary():
    print_title("📊 SUMMARY METRICS")
    try:
        res = requests.get(f"{BASE}/api/summary")
        print(res.json())
    except Exception as e:
        print(f"❌ Failed: /api/summary | {e}")

def test_routes():
    print_title("🛫 TOP 10 ROUTES")
    try:
        res = requests.get(f"{BASE}/api/routes")
        data = res.json()
        for route in data.get("routes", []):
            print(route)
    except Exception as e:
        print(f"❌ Failed: /api/routes | {e}")

def test_metrics():
    print_title("📈 METRICS DATA")
    try:
        res = requests.get(f"{BASE}/api/metrics")
        print(res.json())
    except Exception as e:
        print(f"❌ Failed: /api/metrics | {e}")

def test_flights():
    print_title("✈️  TOP 10 LIVE FLIGHTS")
    try:
        res = requests.get(f"{BASE}/api/flights")
        for f in res.json().get("flights", []):
            print(f)
    except Exception as e:
        print(f"❌ Failed: /api/flights | {e}")

def test_prices():
    print_title("💸 TOP 10 PRICES")
    try:
        res = requests.get(f"{BASE}/api/prices", params={
            "origin": "DEL",
            "destination": "BOM",
            "depart_date": "2025-08-06"
        })
        for p in res.json().get("prices", []):
            print(p)
    except Exception as e:
        print(f"❌ Failed: /api/prices | {e}")

def test_airports():
    print_title("🌍 AIRPORT DROPDOWN DATA")
    try:
        res = requests.get(f"{BASE}/api/airports")
        for a in res.json():
            print(a)
    except Exception as e:
        print(f"❌ Failed: /api/airports | {e}")

def test_filter_routes():
    print_title("🔍 FILTERED ROUTES (DEL to BOM)")
    try:
        res = requests.get(f"{BASE}/api/routes/filter", params={
            "departure": "DEL",
            "arrival": "BOM",
            "start": "2025-07-01",
            "end": "2025-08-31"
        })
        for r in res.json().get("routes", []):
            print(r)
    except Exception as e:
        print(f"❌ Failed: /api/routes/filter | {e}")

# Run all
if __name__ == "__main__":
    test_summary()
    test_routes()
    test_metrics()
    test_flights()
    test_prices()
    test_airports()
    test_filter_routes()
