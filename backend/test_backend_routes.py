import requests

def test_endpoint(name, url):
    print(f"\n🔹 Testing: {name}")
    print("=" * (13 + len(name)))

    try:
        res = requests.get(url)
        res.raise_for_status()
        data = res.json()

        if isinstance(data, list) and not data:
            print("⚠️  API returned an empty list.")
        elif isinstance(data, dict) and not any(data.values()):
            print("⚠️  API returned an empty object.")
        else:
            print("✅ API returned data.")
            print("\n📦 Raw Data:")
            print(data if len(str(data)) < 1500 else str(data)[:1500] + "\n... [truncated]")

    except requests.exceptions.HTTPError as e:
        print(f"❌ Error: {e}")
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")

if __name__ == "__main__":
    print("🚀 Testing All Backend API Endpoints")

    test_endpoint("Summary Metrics", "http://localhost:5000/api/summary")
    test_endpoint("Top Routes", "http://localhost:5000/api/routes")
    test_endpoint("Metrics", "http://localhost:5000/api/metrics")
    test_endpoint("Live Flights", "http://localhost:5000/api/flights")
    test_endpoint("Flight Prices", "http://localhost:5000/api/prices?origin=DEL&destination=BOM&depart_date=2025-08-06")
    test_endpoint("Airports", "http://localhost:5000/api/airports")
    test_endpoint("Filtered Routes", "http://localhost:5000/api/routes/filter?departure=DEL&arrival=BOM&start=2025-08-01&end=2025-08-10")
