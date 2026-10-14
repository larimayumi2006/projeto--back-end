def selectBanco(comando_sql, conexao, parametros=()):
    # Verifica se a conexão com o banco existe.
    if conexao is None:
        return None

    cursorDB = None

    try:
        # Cria o cursor para executar a consulta.
        cursorDB = conexao.cursor()

        # Executa a consulta com parâmetros, quando existirem.
        cursorDB.execute(comando_sql, parametros)

        # Retorna os registros encontrados.
        leitor = cursorDB.fetchall()
        return leitor

    except Exception as erro:
        print(f"Erro ao executar SELECT: {erro}")
        return None

    finally:
        # Fecha o cursor mesmo se ocorrer um erro.
        if cursorDB is not None:
            cursorDB.close()
