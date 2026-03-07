from flask import Flask
from flask_cors import CORS
from .routes import api
import os

app = Flask(__name__)
CORS(app)

# Register API blueprint
app.register_blueprint(api)

# Use PORT from environment if available (for Render or Railway deployment)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Default to 5000
    app.run(host="0.0.0.0", port=port, debug=True)
