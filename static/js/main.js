let button = document.querySelector('Button'),
    div_mensagem = document.querySelector('div');
button.addEventListener('click', async function() {
    let resposta = await fetch('http://127.0.0.1:3000/botao'),
        dados = await resposta.json();
    div_mensagem.textContent = `a mensagem foi: ${dados.message}`;
});