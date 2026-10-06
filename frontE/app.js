const API_URL = 'http://127.0.0.1:5000';
let carrinho = [];

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});

// 1. BUSCA OS DADOS DA API (OU DA MOCK)
async function carregarProdutos() {
    let produtos = [];

    try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) throw new Error('Servidor off');
        produtos = await response.json();
    } catch (erro) {
        console.warn('Usando produtos de teste (Mock):', erro);
        produtos = [
            { id: 1, nome: 'Fone de Ouvido Bluetooth Pink Gamer', preco: 149.90, imagem: 'https://via.placeholder.com/200/ff4081/ffffff?text=Fone+Pink' },
            { id: 2, nome: 'Teclado Mecânico RGB Rosa Pastel', preco: 289.00, imagem: 'https://via.placeholder.com/200/ff4081/ffffff?text=Teclado+Rosa' },
            { id: 3, nome: 'Mousepad Extra Grande Rosa Seco', preco: 69.90, imagem: 'https://via.placeholder.com/200/ff4081/ffffff?text=Mousepad' },
            { id: 4, nome: 'Cadeira Gamer Ergonomica Rosa', preco: 950.00, imagem: 'https://via.placeholder.com/200/ff4081/ffffff?text=Cadeira+Gamer' }
        ];
    }

    renderizarProdutos(produtos);
}

// 2. LÊ O 'card-produto.html', SUBSTITUI OS VALORES E EXIBE NA TELA
async function renderizarProdutos(listaProdutos) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    try {
        // Busca o arquivo HTML da caixa do produto
        const responseTemplate = await fetch('card-produto.html');
        const templateHTML = await responseTemplate.text();

        // Para cada produto, substitui as marcações pelo valor real
        listaProdutos.forEach(produto => {
            const precoFormatado = Number(produto.preco).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            // Substitui {{IMAGEM}}, {{NOME}} e {{PRECO}} do arquivo card-produto.html
            let cardHTML = templateHTML
                .replaceAll('{{IMAGEM}}', produto.imagem || 'https://via.placeholder.com/200')
                .replaceAll('{{NOME}}', produto.nome)
                .replaceAll('{{PRECO}}', precoFormatado);

            // Injeta o HTML gerado dentro do #productGrid
            grid.insertAdjacentHTML('beforeend', cardHTML);
        });

    } catch (erro) {
        console.error('Erro ao carregar o arquivo card-produto.html:', erro);
    }
}

// 3. CARRINHO
function adicionarAoCarrinho(nomeProduto) {
    carrinho.push(nomeProduto);
    document.getElementById('cartCount').innerText = carrinho.length;
    alert(`"${nomeProduto}" foi adicionado ao seu carrinho! 🛒`);
}