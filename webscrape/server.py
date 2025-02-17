from flask import Flask, request, jsonify
from forever21 import get_forever21_products
from escuela import get_escuela_products
from walmart import get_walmart_products

app = Flask(__name__)

@app.route("/search", methods=["GET"])
def search_products():
    user_query = request.args.get("query", "")

    f21_products = get_forever21_products(user_query)
    esc_products = get_escuela_products(user_query)
    wm_products = get_walmart_products(user_query)
    
    data = {
        "forever21": f21_products,
        "escuelaJS": esc_products,
        "walmart": wm_products
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
