"use strict";

const cep = document.getElementById("cep");
const btnPesquisar = document.getElementById("btnPesquisar");
const saida = document.getElementById("saida");

function obterCEP() {
    return cep.value;
}

function exibirDadosCep(obj) {
    if (!obj.erro) {
        return `${obj.logradouro} - ${obj.bairro} - ${obj.localidade}/${obj.uf}`;
    } else {
        return `Cep inexistente.`;
    }
}

async function onClick() {
    const cepDigitado = obterCEP();
   
    if (!/^\d{8}$/.test(cepDigitado)) {
        saida.textContent = "Por favor, insira um CEP válido.";
        return;
    }

    const urlCep = "https://viacep.com.br/ws/" + cepDigitado + "/json";

    try {
        const response = await fetch(urlCep);
        if (!response.ok) {
            throw new Error("Erro ao buscar o cep.");
        }

        const dadosJSON = await response.json();

        if (dadosJSON.erro) {
            throw new Error("Erro, CEP não encontrado");
        }

        saida.textContent = exibirDadosCep(dadosJSON);

    } catch (error) {
        if (error.message === "Failed to fetch") {
            saida.textContent = "Erro de rede ou servidor indisponível. Tente novamente mais tarde.";
        } else {
            saida.textContent = error.message;
        }
    }
}

btnPesquisar.addEventListener("click", onClick);

cep.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        onClick();
    }
});
