// Aguarda o DOM (estrutura HTML) estar completamente carregado
window.addEventListener("DOMContentLoaded", () => {
  //
  // Seletores dos elementos do formulário e da lista
  const formularioDespesa = document.getElementById("form-despesa"); // <-- CORRIGIDO
  const descricaoInput = document.getElementById("descricao");
  const valorInput = document.getElementById("valor");
  const dataInput = document.getElementById("data");
  const listaDespesas = document.getElementById("lista-despesas"); // <-- CORRIGIDO
  const totalDespesasEl = document.getElementById("total-despesas"); // <-- CORRIGIDO

  const API_URL = "/api/despesas"; // URL base da sua API

  // --- Funções de busca de dados ---

  // Função para buscar e exibir todas as despesas
  async function buscarDespesas() {
    try {
      const resposta = await fetch(API_URL);
      const despesas = await resposta.json();

      listaDespesas.innerHTML = ""; // Limpa a lista antes de adicionar os itens

      despesas.forEach((despesa) => {
        const item = document.createElement("tr"); // Usando <tr> para a tabela

        // Formata a data para dd/mm/aaaa
        const dataFormatada = new Date(despesa.data).toLocaleDateString(
          "pt-BR",
          { timeZone: "UTC" } // Adicionado timeZone para evitar bugs de dia
        );

        // Formata o valor para R$
        const valorFormatado = despesa.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        // Adaptado para o formato de tabela (<td>)
        item.innerHTML = `
                    <td>${despesa.descricao}</td>
                    <td>${valorFormatado}</td>
                    <td>${dataFormatada}</td>
                    <td>
                        <button class="btn-alterar" data-id="${despesa._id}">Alterar</button>
                        <button class="btn-excluir" data-id="${despesa._id}">Excluir</button>
                    </td>
                `;
        listaDespesas.appendChild(item);
      });
    } catch (erro) {
      console.error("Erro ao buscar despesas:", erro);
    }
  }

  // Função para obter o somatório das despesas
  async function buscarTotalDespesas() {
    try {
      const resposta = await fetch(`${API_URL}/total`); //
      const dados = await resposta.json(); //

      // Usando a função de formatação para consistência
      const totalFormatado = dados.totalAmount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      totalDespesasEl.innerText = totalFormatado;
    } catch (erro) {
      //
      console.error("Erro ao buscar o total das despesas:", erro); //
    }
  }

  // --- Funções de atualização (chamadas após Criar, Atualizar, Excluir) ---

  // Função para recarregar dados e limpar formulário
  async function atualizarInterface() {
    await buscarDespesas();
    await buscarTotalDespesas(); //
    formularioDespesa.reset(); // Limpa os campos do formulário
  }

  // --- Event Listeners (Ouvintes de Eventos) ---

  // Carregar dados iniciais ao abrir a página
  buscarDespesas();
  buscarTotalDespesas();

  // 1. Cadastrar Despesa
  formularioDespesa.addEventListener("submit", async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    let valorData = dataInput.value;
    // Define data padrão se estiver vazio
    if (!valorData) {
      valorData = new Date().toISOString().split("T")[0]; // Formato AAAA-MM-DD
    }

    // Validação de campos vazios e valor negativo
    if (!descricaoInput.value || !valorInput.value) {
      alert("Descrição e Valor são obrigatórios.");
      return;
    }
    if (parseFloat(valorInput.value) < 0) {
      alert("O valor não pode ser negativo.");
      return;
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descricao: descricaoInput.value,
          valor: parseFloat(valorInput.value),
          data: valorData,
        }),
      });
      atualizarInterface(); // Atualiza a lista e o total
    } catch (erro) {
      console.error("Erro ao cadastrar despesa:", erro);
    }
  });

  // 2. Ações de Alterar e Excluir (usando delegação de eventos)
  listaDespesas.addEventListener("click", async (e) => {
    const alvo = e.target;

    // Garante que só vamos pegar o ID de um botão
    if (alvo.tagName !== "BUTTON") return;

    const id = alvo.dataset.id;

    // 2.1 Excluir Despesa
    if (alvo.classList.contains("btn-excluir")) {
      if (!confirm("Tem certeza que deseja excluir esta despesa?")) {
        return;
      }
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        atualizarInterface(); // Atualiza a lista e o total
      } catch (erro) {
        console.error("Erro ao excluir despesa:", erro);
      }
    }

    // 2.2 Alterar Despesa
    if (alvo.classList.contains("btn-alterar")) {
      // Implementação simples com 'prompt'.
      // O ideal seria preencher o formulário principal ou abrir um modal.
      const novaDescricao = prompt("Nova descrição:");
      const novoValor = prompt("Novo valor:");
      const novaData = prompt("Nova data (AAAA-MM-DD):"); // Ex: 2024-10-25

      if (novaDescricao && novoValor && novaData) {
        try {
          await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              descricao: novaDescricao,
              valor: parseFloat(novoValor),
              data: novaData,
            }),
          });
          atualizarInterface(); // Atualiza a lista e o total
        } catch (erro) {
          console.error("Erro ao alterar despesa:", erro);
        }
      }
    }
  });
});
