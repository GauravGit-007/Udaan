import requests
from datetime import datetime
from collections import defaultdict

# API Keys
AVIATIONSTACK_API_KEY = "985ad138641e4a0ee42fa7c197bf09ae"
TRAVELPAYOUTS_API_TOKEN = "f07042db2e352fe2777cc4439ae24895"

# === API Fetchers ===
def fetch_flight_data(limit=100):
    url = "http://api.aviationstack.com/v1/flights"
    params = {
        "access_key": AVIATIONSTACK_API_KEY,
        "limit": limit
    }
    try:
        res = requests.get(url, params=params)
        return res.json().get("data", [])
    except Exception as e:
        print(f"[ERROR] AviationStack: {e}")
        return []

def get_flight_prices(origin="DEL", destination="BOM"):
    url = "https://api.travelpayouts.com/aviasales/v3/get_latest_prices"
    params = {
        "origin": origin,
        "destination": destination,
        "currency": "inr",
        "token": TRAVELPAYOUTS_API_TOKEN
    }
    try:
        res = requests.get(url, params=params)
        return res.json().get("data", [])
    except Exception as e:
        print(f"[ERROR] Travelpayouts: {e}")
        return []

# === Output Functions ===
def print_section(title):
    print(f"\n🔹 {title.upper()}\n" + "="*60)

def print_live_flights():
    print_section("Top 10 Live Flights")
    flights = fetch_flight_data(100)
    if not flights:
        print("No flight data available.")
        return
    for i, f in enumerate(flights[:10], 1):
        dep = f.get("departure", {}).get("iata", "N/A")
        arr = f.get("arrival", {}).get("iata", "N/A")
        airline = f.get("airline", {}).get("name", "N/A")
        status = f.get("flight_status", "N/A")
        print(f"{i}. {dep} → {arr} | {airline} | Status: {status}")

def print_prices():
    print_section("Top 10 Flight Prices")
    prices = get_flight_prices("DEL", "BOM")
    if not prices:
        print("No pricing data.")
        return
    for i, p in enumerate(prices[:10], 1):
        origin = p.get("origin", "N/A")
        dest = p.get("destination", "N/A")
        price = p.get("value", "N/A")
        date = p.get("depart_date", "N/A")
        print(f"{i}. {origin} → {dest} | ₹{price} | Date: {date}")

def print_summary_and_routes():
    print_section("Flight Summary & Top Routes")
    data = fetch_flight_data(100)
    print(f"Total Flights: {len(data)}")

    route_count = defaultdict(int)
    date_count = defaultdict(int)
    carriers = set()
    countries = set()

    for f in data:
        dep = f.get("departure", {}).get("airport")
        arr = f.get("arrival", {}).get("airport")
        date = f.get("departure", {}).get("scheduled")
        if dep and arr:
            route_count[f"{dep} → {arr}"] += 1
        if date:
            try:
                d = datetime.fromisoformat(date).strftime("%Y-%m-%d")
                date_count[d] += 1
            except:
                pass
        if f.get("airline", {}).get("name"):
            carriers.add(f["airline"]["name"])
        if f.get("departure", {}).get("country"):
            countries.add(f["departure"]["country"])

    most_popular = max(route_count.items(), key=lambda x: x[1], default=("N/A", 0))
    peak_day = max(date_count.items(), key=lambda x: x[1], default=("N/A", 0))

    print(f"Most Popular Route : {most_popular[0]} ({most_popular[1]})")
    print(f"Peak Demand Date   : {peak_day[0]} ({peak_day[1]})")
    print(f"Unique Airlines    : {len(carriers)}")
    print(f"Countries Served   : {len(countries)}")

    print_section("Top 10 Routes")
    for i, (r, c) in enumerate(sorted(route_count.items(), key=lambda x: x[1], reverse=True)[:10], 1):
        print(f"{i}. {r} | Flights: {c}")

def print_airport_dropdown():
    print_section("Airport Dropdown Options")
    data = fetch_flight_data(100)
    seen = {}
    for f in data:
        for side in ["departure", "arrival"]:
            code = f.get(side, {}).get("iata")
            name = f.get(side, {}).get("airport")
            if code and name:
                seen[code] = name
    for code, name in seen.items():
        print(f"{code} - {name}")

def print_filtered_routes(dep_code="DEL", arr_code="BOM", start="2025-08-01", end="2025-08-10"):
    print_section(f"Filtered Routes {dep_code} to {arr_code} between {start} and {end}")
    data = fetch_flight_data(200)
    for f in data:
        d_code = f.get("departure", {}).get("iata")
        a_code = f.get("arrival", {}).get("iata")
        date = f.get("departure", {}).get("scheduled")
        if d_code == dep_code and a_code == arr_code:
            try:
                d_obj = datetime.fromisoformat(date).date()
                if datetime.strptime(start, "%Y-%m-%d").date() <= d_obj <= datetime.strptime(end, "%Y-%m-%d").date():
                    print(f"{d_code} → {a_code} | Date: {d_obj}")
            except:
                continue

# === Main Test Driver ===
if __name__ == "__main__":
    print_live_flights()
    print_prices()
    print_summary_and_routes()
    print_airport_dropdown()
    print_filtered_routes()
