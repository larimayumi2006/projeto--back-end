const API_URL = ''; //Deixar a URL vazia faz o JavaScript usar o mesmo endereço da página
let carrinho = [];

let tdsprod = []

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
//Loc Fomulario e campo de pesquisa
    const searchForm = document.getElementById('searchForm')
    const searchInput = document.getElementById('searchInput')
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit',(evento) => {
            evento.preventDefault();//ass o form n recarrega a pagina
            //filtro por nome
            const termo = searchInput.value.trim().toLocaleLowerCase('pt-BR')
            const prodFil = tdsprod.filter(prod => String(prod.nome || '')
                .toLocaleLowerCase('pt-BR').includes(termo));
            renderizarProdutos(prodFil);
        });
    }
    
});

// busca os produtos na API
async function carregarProdutos() {
    try {
        const response = await fetch('/produtos');

        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }

        tdsprod = await response.json();
        const imagens = {
    1: 'https://www.gulfdeals.com/cdn/shop/files/Untitled_design_6_9987fbbd-94e3-4bcf-92a0-4b7de067cc66_1024x.png?v=1730895436',
    2: 'https://www.oficinadanet.com.br/imagens/obj_item/1909/dell-i3520wadl1010bts.jpg',
    3: 'https://gbarbosa.vtexassets.com/arquivos/ids/234920/655cac5f3ccb107f03c54b3c.jpg?v=638361690589730000',
    4: 'https://a-static.mlcdn.com.br/w/600/h/600/monitor-ultrawide-lg-29wl500-b-29-full-hd-ips-led-hdmi-freesync/magazineluiza/232283500/5a00c42906f8f9b8ba4d00672f84a4ba.jpg',
    5: 'https://redragon.com/cdn/shop/files/RedragonK671104-KeyMechanicalGamingKeyboard.png?v=1751281460&width=1000',
    6: 'https://resource.logitechg.com/content/dam/gaming/en/products/refreshed-g203/2025-update/g203-mouse-3qtr-high-back-angle-black-gallery-7.png',
    7: 'https://welaxhome.com/cdn/shop/files/lc5bz_6.webp?v=1779161627&width=1920',
    8: 'https://mobileimages.lowes.com/productimages/39a55d5f-53f8-4baa-b117-6ef697c99e2e/86368398.jpeg?size=pdhz',
    9: 'https://uk.hyperx.com/cdn/shop/files/hyperx_cloud_ii_red_1_main.jpg?v=1770037214',
    10: 'https://down-ph.img.susercontent.com/file/3ee9ab5bb45460480d8599b2748f3804',
    11: 'https://img.ep-cdn.com/i/500/500/xw/xwrjgqmetzubodcfphik/kingston-1tb-m-2-nvme-snv2s-1000g-ssd-nv2-series-ssd-hard-disk-cene.jpg'
};

// Adiciona a URL da foto a cada produto
tdsprod.forEach(produto => {
    produto.imagem = imagens[produto.id];
});

// Exibe os produtos com suas fotos
renderizarProdutos(tdsprod);
        

    } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
    }
}

 // cards dos produtos na página
async function renderizarProdutos(listaProdutos) {

    // espaço de exibição
    const grid = document.getElementById('productGrid');

    if (!grid) return;

    // limpeza
    grid.innerHTML = '';

    try {
        // busca o arquivo modelo
        const responseTemplate = await fetch('/frontE/cards.html');

        if (!responseTemplate.ok) {
            throw new Error('Não foi possível carregar os cards');
        }

        // lê o conteúdo do arq HTML como text
        const templateHTML = await responseTemplate.text();

        // percorre a lista para criar um card para cada produto
        listaProdutos.forEach(produto => {

            // conversão valor
            const precoFormatado = Number(produto.preco)
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

            
            const cardHTML = templateHTML
               .replaceAll(
                    '{{IMAGEM}}',
                    produto.imagem || (
                        'https://placehold.co/300x200/ffb6d9/ffffff?text=' +
                         encodeURIComponent(produto.nome)
    )
)
                .replaceAll('{{NOME}}', produto.nome) 
                .replaceAll('{{PRECO}}', precoFormatado); 

            // add o card na area de prodoptos da pagina
            grid.insertAdjacentHTML('beforeend', cardHTML);
        });

        if (listaProdutos.length === 0) {
            grid.textContent = 'Nenhum produto encontrado.';
        }

    } catch (erro) {
        console.error('Erro ao carregar os cards:', erro);

        grid.textContent = 'Não foi possível exibir os produtos.';
    }
}

// 2 CARRINHO
function adicionarAoCarrinho(nomeProduto) {
    carrinho.push(nomeProduto);
    document.getElementById('cartCount').innerText = carrinho.length;
    alert(`"${nomeProduto}" foi adicionado ao seu carrinho! 🛒`);
}
