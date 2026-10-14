from models.conexaoBanco import conexaoBanco
from models.selectBanco import selectBanco


def busca(dados):
    conecxao = conexaoBanco("127.0.0.1", "lojinha", "Larissa", "Larissa.2006")
  # Verifica se a conexão foi estabelecida
if conexao is None:
    return None

try:
    # Procura produtos que contenham o texto digitado
    comando = "SELECT * FROM produtos WHERE Nome LIKE %s"
    parametros = (f"%{dados}%",)

    # Executa a consulta usando parâmetros seguros
    resultado = selectBanco(comando, conexao, parametros)

    return resultado

finally:
    # Fecha a conexão depois da consulta
    conexao.close()
