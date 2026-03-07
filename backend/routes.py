from flask import Blueprint, jsonify, request
from .aviation_api import fetch_flight_data
from .travelpayouts_api import get_flight_prices
from collections import defaultdict
from datetime import datetime
from .insights_service import generate_insights

api = Blueprint('api', __name__)

def get_airport_name(flight, key):
    """Get full airport name or fallback to IATA code."""
    return flight.get(key, {}).get("airport") or flight.get(key, {}).get("iata", "N/A")

def get_filtered_data():
    data = fetch_flight_data(200)
    dep_filter = request.args.get("departure")
    arr_filter = request.args.get("arrival")
    start = request.args.get("start")
    end = request.args.get("end")

    filtered = []
    for flight in data:
        dep_code = flight.get("departure", {}).get("iata")
        arr_code = flight.get("arrival", {}).get("iata")
        date = flight.get("departure", {}).get("scheduled")

        if not (dep_code and arr_code and date): continue
        if dep_filter and dep_code != dep_filter: continue
        if arr_filter and arr_code != arr_filter: continue

        if start and end:
            try:
                date_obj = datetime.fromisoformat(date).date()
                start_date = datetime.strptime(start, "%Y-%m-%d").date()
                end_date = datetime.strptime(end, "%Y-%m-%d").date()
                if not (start_date <= date_obj <= end_date):
                    continue
            except:
                continue
        
        filtered.append(flight)
    return filtered

@api.route("/api/summary")
def summary():
    data = get_filtered_data()
    total_flights = len(data)

    route_count = defaultdict(int)
    date_count = defaultdict(int)

    for flight in data:
        dep = get_airport_name(flight, "departure")
        arr = get_airport_name(flight, "arrival")
        date = flight.get("departure", {}).get("scheduled")
        if dep and arr:
            route_count[f"{dep} → {arr}"] += 1
        if date:
            try:
                date_only = datetime.fromisoformat(date).strftime("%Y-%m-%d")
                date_count[date_only] += 1
            except:
                continue

    most_popular_route = max(route_count.items(), key=lambda x: x[1], default=("N/A", 0))
    peak_date = max(date_count.items(), key=lambda x: x[1], default=("N/A", 0))

    return jsonify({
        "total_flights": total_flights,
        "most_popular_route": most_popular_route[0],
        "peak_demand_date": peak_date[0]
    })

@api.route("/api/routes")
def top_routes():
    data = get_filtered_data()
    route_map = defaultdict(int)

    for flight in data:
        dep = get_airport_name(flight, "departure")
        arr = get_airport_name(flight, "arrival")
        if dep and arr:
            route_map[(dep, arr)] += 1

    sorted_routes = sorted(route_map.items(), key=lambda x: x[1], reverse=True)[:10]

    output = []
    for (dep, arr), count in sorted_routes:
        output.append({
            "route": f"{dep} → {arr}",
            "passengers": count,
            "growth": 0.0,
            "departure_code": dep,
            "arrival_code": arr
        })

    return jsonify({"routes": output})

@api.route("/api/airports")
def airports():
    data = fetch_flight_data(200) # Airports list should probably stay unfiltered or cached
    seen = {}
    for flight in data:
        for side in ['departure', 'arrival']:
            airport = flight.get(side, {}).get("airport")
            code = flight.get(side, {}).get("iata")
            if airport and code:
                seen[code] = airport
    return jsonify([{"code": code, "name": name} for code, name in seen.items()])

@api.route("/api/routes/filter")
def filter_routes_endpoint():
    data = get_filtered_data()
    output = []
    for flight in data:
        dep = get_airport_name(flight, "departure")
        arr = get_airport_name(flight, "arrival")
        code_dep = flight.get("departure", {}).get("iata")
        code_arr = flight.get("arrival", {}).get("iata")
        
        output.append({
            "route": f"{dep} → {arr}",
            "passengers": 1,
            "growth": 0.0,
            "departure_code": code_dep,
            "arrival_code": code_arr
        })

    return jsonify({"routes": output})

@api.route("/api/metrics")
def metrics():
    data = get_filtered_data()
    total = len(data)
    carriers = set(flight.get("airline", {}).get("name") for flight in data if flight.get("airline", {}).get("name"))
    countries = set(flight.get("departure", {}).get("country") for flight in data if flight.get("departure", {}).get("country"))

    return jsonify({
        "total_flights": total,
        "unique_airlines": len(carriers),
        "countries_served": len(countries)
    })

@api.route("/api/flights")
def get_flights():
    data = fetch_flight_data(10)
    print("[DEBUG] Raw flight data:", data)  # <-- Add this line
    output = []
    for flight in data:
        dep = flight.get("departure", {}).get("iata", "N/A")
        arr = flight.get("arrival", {}).get("iata", "N/A")
        airline = flight.get("airline", {}).get("name", "N/A")
        status = flight.get("flight_status", "N/A")

        output.append({
            "departure": dep,
            "arrival": arr,
            "airline": airline,
            "status": status
        })
    return jsonify({"flights": output})

@api.route("/api/prices")
def get_prices():
    origin = request.args.get("origin", "DEL")
    destination = request.args.get("destination", "BOM")
    depart_date = request.args.get("depart_date", "2025-08-06")

    try:
        # Travelpayouts function expects 2 arguments in current definition
        prices = get_flight_prices(origin, destination)
        print("[DEBUG] Raw prices data:", prices)
    except Exception as e:
        print("[ERROR - Travelpayouts]", e)
        return jsonify({"error": str(e), "prices": []}), 500

    output = []
    for p in prices[:10]:
        output.append({
            "origin": p.get("origin", "N/A"),
            "destination": p.get("destination", "N/A"),
            "airline": "N/A",  # API doesn't give airline
            "price": p.get("value", "N/A"),
            "date": p.get("depart_date", "N/A")
        })

    return jsonify({"prices": output})
@api.route("/api/ai-insights")
def ai_insights():
    data = get_filtered_data()
    insights = generate_insights(data)
    return jsonify(insights)

