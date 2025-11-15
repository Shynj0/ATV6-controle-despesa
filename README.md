## 🧾 Controle de Despesas API & Frontend

Este é um projeto simples de gerenciamento de despesas (CRUD - Criar,
Ler, Atualizar, Excluir), construído com Node.js, Express e MongoDB. Ele
utiliza TypeScript para garantir a segurança de tipos e possui um
frontend básico em HTML, CSS e JavaScript para interação.

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

  Categoria             Tecnologia                              Versão Principal
  --------------------- --------------------------------------- ------------------
  **Backend**           **Node.js** & **Express**               Últimas
  **Banco de Dados**    **MongoDB** (via Mongoose)              Últimas
  **Linguagem**         **TypeScript**                          Últimas
  **Desenvolvimento**   `ts-node-dev`                           Últimas
  **Frontend**          **HTML5, CSS3, JavaScript (Vanilla)**   N/A

------------------------------------------------------------------------

## 📦 Estrutura do Projeto

O código-fonte principal reside na pasta `src/` e segue uma estrutura
MVC (Model-View-Controller) clara:

    ATV6-CONTROLEDESPESAS/
    ├── src/
    │   ├── controllers/         # Lógica de manipulação das rotas (CRUD)
    │   │   └── despesaController.ts
    │   ├── models/              # Definição do Schema Mongoose (Despesa.ts)
    │   │   └── Despesa.ts
    │   ├── routes/              # Definição das rotas da API
    │   │   └── rotasDespesas.ts
    │   ├── views/               # Frontend (HTML, CSS, JS) servido estaticamente
    │   │   ├── index.html
    │   │   ├── script.js
    │   │   └── styles.css
    │   └── server.ts            # Ponto de entrada do aplicativo (Configura Express e DB)
    ├── package.json             # Dependências e scripts do projeto
    └── tsconfig.json            # Configuração do TypeScript

------------------------------------------------------------------------

## 🏁 Primeiros Passos

### 1. Pré-requisitos

Certifique-se de ter instalado:

-   **Node.js** (inclui npm)
-   **MongoDB** Server (rodando localmente ou uma string de conexão
    remota)

### 2. Configuração do Banco de Dados

O projeto está configurado para se conectar a um MongoDB local.

-   **Ação:** Inicie o serviço do seu servidor MongoDB.
-   **URI de Conexão:** `mongodb://localhost:27017/controle-despesas`

O banco de dados `controle-despesas` será criado automaticamente na
primeira vez que você adicionar uma despesa.

### 3. Instalação das Dependências

``` bash
npm install
```

### 4. Iniciar o Servidor em Modo de Desenvolvimento

``` bash
npm run dev
```

Mensagens esperadas no terminal:

    Conectado ao MongoDB com sucesso!
    Servidor rodando na porta 3000 -> http://localhost:3000/

### 5. Acesso

Acesse no navegador:

    http://localhost:3000/

------------------------------------------------------------------------

## ⚙️ Rotas da API

Todas as rotas usam o prefixo `/api`.

  -----------------------------------------------------------------------
  Método                  Endpoint                Descrição
  ----------------------- ----------------------- -----------------------
  **POST**                `/api/despesas`         Cria uma nova despesa.

  **GET**                 `/api/despesas`         Lista todas as despesas
                                                  (ordenadas por data).

  **GET**                 `/api/despesas/total`   Retorna a soma total
                                                  dos valores.

  **PUT**                 `/api/despesas/:id`     Atualiza uma despesa
                                                  específica.

  **DELETE**              `/api/despesas/:id`     Exclui uma despesa
                                                  específica.
  -----------------------------------------------------------------------
