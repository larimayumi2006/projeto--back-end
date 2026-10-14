from pathlib import Path # Mais facil de loc as pastas e arqvs'
from flask import Blueprint , request, send_from_directory
from controllers.busca import busca


#serve para ligar as rotas no app.py (evitar referencia circular)
bpView = Blueprint('bpView' , __name__)

#Caminho direto p pasta
front_d = Path(__file__).resolve().parent.parent / "frontE"

#Env do HTML do FE qnd a pagina principal é abeta
@bpView.route('/')
def home():
    return send_from_directory(front_d, 'index.html')
    

#permite o navegador acessar o que esta dentro da pasta do FE
@bpView.route("/frontE/<path:filename>")
def arquivos_fronte(filename):
    return send_from_directory(front_d, filename)

#rota de teste 
@bpView.route('/botao', methods=['GET'])
def botao():
    return {'message':'botao'}
    
#rota pesquisa
@bpView.route('/pesquisar', methods=['POST'])
def pesquisar():
    dados_input = request.form.get('nome_Produto', '').strip() #remove espaços extras no inicio e fim

    if not dados_input:
        return {"erro" : "Digite o nome de um produto"}, 400
        
    resultado = busca(dados_input)

    if resultado is None:
        return {"erro": "Não foi possivel consultar os produtos"}, 500
#produtos encontardos
    return{"resultado": resultado}
