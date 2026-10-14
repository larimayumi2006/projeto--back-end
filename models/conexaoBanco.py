import mysql.connector
from mysql.connector import Error

def conexaoBanco(host , database, user, password):
    try:
        #tenta conectar o BD MSQL
        conexao = mysql.connector.connect(
            host= host,
            user= user,
            password= password,
            database=database
        )
         # Retorna a conexão quando ela estiver ativa.
        if conexao.is_connected():
            print("Conexão com o MySQL estabelecida.")
            return conexao

        # Informa que não foi possível estabelecer a conexão.
        conexao.close()
        return None

    except Error as erro:
        # Exibe o erro sem revelar a senha.
        print(f"Erro ao conectar ao MySQL: {erro}")
        return None


