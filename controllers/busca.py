from models.conexaoBanco import conexaoBanco
from models.selectBanco import selectBanco


def busca(dados):
    cursor = conexaoBanco("127.0.0.1", "lojinha", "Larissa", "Larissa.2006")
    comando = f"SELECT * FROM produtos WHERE Nome = '{dados}'"

    if cursor:
        dt = selectBanco(comando , cursor)
        print(dt)
        return dt
    else:
        return 'não tem cursor'