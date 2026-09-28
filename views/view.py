from flask import Flask , render_template , Blueprint , request
from controllers.busca import busca

#serve para ligar as rotas no app.py (evitar referencia circular)
bpView = Blueprint('bpView' , __name__)

@bpView.route('/')
def home():
    return render_template('index.html')

@bpView.route('/botao', methods=['GET'])
def botao():
    return {'message':'botao'}

@bpView.route('/pesquisar', methods=['POST'])
def pesquisar():
    if request.method == 'POST':
        # Captura o valor usando o 'name' definido no input do HTML
        dados_input = request.form.get('nome_Produto')
        return busca(dados_input)
