from flask import Flask , render_template
from flask_cors import CORS
from views.view import bpView

app = Flask(__name__)
CORS(app)
app.register_blueprint(bpView)

if __name__ == '__main__':
    app.run(debug=True, port=3000, host='0.0.0.0')