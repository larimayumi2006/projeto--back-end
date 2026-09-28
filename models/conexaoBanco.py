import mysql.connector
from mysql.connector import Error

def conexaoBanco(host , database, user, password):
    try:
        conexao = mysql.connector.connect(
            host= host,
            user= user,
            password= password,
            database=database
        )
        print('Entrei '+ host+' '+database+' '+user+' '+password)

    #if conexao.connected:
        print('conexão ativa')
        #cursorDB = conexao.cursor()
        return conexao
    #else:
    #    print('nao')
    #    raise ConnectionError
        
    except Error as e:
        conexao.close()
        print(f"Erro ao conectar com o banco mysql: {e}") 

