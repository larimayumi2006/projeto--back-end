
from models.conexaoBanco import conexaoBanco
from models.selectBanco import selectBanco


def busca(dados):
    conec = conexaoBanco(
        "127.0.0.1",
        "lojinha",
        "pinkmercado",
        "pink123"
    )

    if conec is None:
        return None

    try:
        comando = "SELECT * FROM produtos WHERE nome LIKE %s"
        parametros = (f"%{dados}%",)

        resultado = selectBanco(comando, conec, parametros)

        return resultado

    finally:
        conec.close()
