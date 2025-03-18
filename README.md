# Projeto de Consulta de CEP

Este projeto é uma aplicação web que permite consultar informações de endereço a partir de um CEP utilizando a API ViaCep. Ele foi desenvolvido com foco em boas práticas de JavaScript, consumo de APIs e responsividade.

## Funcionalidades

- Consulta de informações de endereço a partir de um CEP válido.
- Exibição dinâmica dos dados de endereço no navegador.
- Tratamento de erros em casos de CEP inválido ou falha na comunicação com a API.
- Interface responsiva para diferentes tamanhos de dispositivos.

## Tecnologias Utilizadas

- **HTML**: Estrutura da página.
- **CSS**: Estilização e responsividade.
- **JavaScript**: Lógica da aplicação, incluindo consumo de API e manipulação de DOM.

## Estrutura de Arquivos

```
src/
├── css/
│   └── estilos.css
├── js/
│   └── scripts.js
└── index.html
```

## Principais Conceitos Aplicados

### 1. eventListener

O projeto utiliza `eventListener` para capturar eventos do usuário, como o clique em botões ou envio de formulários, garantindo uma interação dinâmica e eficiente.

```javascript
pesquisar.addEventListener("click", () => {
    ...
})
```

### 2. async/await e fetch

As requisições à API ViaCep são realizadas utilizando o método `fetch`, que retorna uma `Promise`. Para lidar com essas operações assíncronas de maneira mais eficiente e legível, o projeto faz uso de `async/await`. Essa abordagem permite processar as respostas da API sem bloquear a execução do restante do código, além de facilitar o tratamento de erros:

```javascript
pesquisar.addEventListener("click", async () => {
    const resposta = await fetch(consultarCep(getCep(cep)));
})
```

### 3. Serialização e Desserialização de JSON

Os dados obtidos pela API ViaCep estão no formato JSON. O projeto utiliza a desserialização para transformar os dados recebidos em objetos JavaScript manipuláveis:

```javascript
pesquisar.addEventListener("click", async () => {
    const resposta = await fetch(consultarCep(getCep(cep)));

    // Desserialização JSON
    const dadosJSON = await resposta.json();
})
```

### 4. Mensageria de Erro (try-catch)

O projeto emprega blocos `try-catch` para tratar possíveis erros de forma robusta e fornecer feedbacks claros ao usuário:

```javascript
pesquisar.addEventListener("click", async () => {
    try {
        const resposta = await fetch(consultarCep(getCep(cep)));

        // Desserialização JSON
        const dadosJSON = await resposta.json();

        if(dadosJSON.erro) throw new Error("CEP buscado não existe.");

        // Criar novo componente:
        const novoEndereco = criarComponenteEndereco(dadosJSON);
        historicoLista.appendChild(novoEndereco);
    }
    catch(err) {
        // Tratar o Failed to Fetch:
        if (err.message === "Failed to fetch") alert("Erro: tamanho de CEP Inválido.");
        else alert(`Erro: ${err.message}`);
    }
})
```

### 5. Criação Dinâmica de Componente de Endereço:

Os dados retornados pela API são utilizados para  criar dinamicamente um componente de endereço com base nas propriedades do objeto desserializado. A função criarComponenteEndereco é responsável por gerar esse componente utilizando manipulação do DOM:

```javascript
function criarComponenteEndereco(dadosJSON) {
    const endereco = document.createElement("div");
    // Adicionar classe:
    endereco.classList.add("endereco");
    endereco.innerHTML = `
        <h2 class="estado">${dadosJSON.uf}</h2>
        <div class="detalhes">
            <div class="dados">
                <h3 class="localidade">${dadosJSON.localidade}</h3>
                <p class="logradoura">${dadosJSON.logradouro}, ${dadosJSON.bairro}</p>
            </div>
            <div class="box-footer">
                <p class="cep-buscado">CEP: ${dadosJSON.cep}</p>
                <button class="remover">X</button>
            </div>
        </div>
    `;

    // Remover item de pesquisa (botão X):
    const btnRemover = endereco.querySelector(".remover");
    
    btnRemover.addEventListener("click", () => {
        endereco.remove();
    })

    return endereco;
}
```

### 6. Responsividade: Media Queries e Abordagem Mobile First

O projeto utiliza media queries para ajustar a interface de acordo com diferentes tamanhos de tela, seguindo a abordagem mobile first. Essa estratégia garante que o design inicial seja otimizado para dispositivos móveis e, em seguida, adaptado para telas maiores. Exemplos de media queries utilizadas:

```css
/* Medium (md): Tablet */
@media (min-width: 768px) {
    ...
}

/* Large (lg): desktops */
@media (min-width: 1025px) {
    ...
}

```

## Licença

Este projeto está licenciado sob a MIT License. Consulte o arquivo LICENSE para mais informações.
