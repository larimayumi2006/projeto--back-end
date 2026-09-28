from models.conexaoBanco import *

def selectBanco(comando_sql , conexao ):

  try:
    cursorDB = conexao.cursor()
    cursorDB.execute(comando_sql)

    leitor = cursorDB.fetchall()
    cursorDB.close()
    return leitor

  except Exception as e:
    # cursor.close()
    print(f"Erro ao executar SELECT: {e}")