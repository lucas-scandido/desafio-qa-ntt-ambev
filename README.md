# ServeRest - Testes Automatizados
Projeto de Testes Automatizados E2E e API para a aplicação ServeRest. Este projeto é utilizado como fase do desafio técnico da NTT DATA.

# Pré-requisitos
1. Versão do **`node`** `>=20.17.0`
2. Versão do **`yarn/npm`** `>=1.22.22 / 10.8.3`
3. Versão do **`cypress`** `>=14.0.0`

# Instalação
##### 1. Clone o repositório:

```
https://github.com/lucas-scandido/desafio-qa-ntt-ambev.git
```

##### 2. Navegue até o diretório:

```
cd desafio-qa-ntt-ambev
```

##### 3. Instale as dependências:

```
yarn install
    ou
npm install
```

##### 4. Entendendo as dependências:

<details><summary>Faker</summary>

Esta biblioteca permite gerar dados fictícios de maneira aleatória. Ela é utilizada para gerar dados de usuários, produtos, etc. Para mais informações, consulte a [doc](https://fakerjs.dev/guide/) oficial.

</details>

<details><summary>Cypress Plugin API</summary>

Esta biblioteca facilita a realização de testes de API. Com ela podemos facilmente verificar as respostas das requisições, incluindo status, cabeçalhos e corpo da resposta, facilitando a validação do comportamento da API no modo interativo. Para mais informações, consulte a [doc](https://github.com/filiphric/cypress-plugin-api) oficial.

</details>

# Documentações relevantes:

- **Documentação da Aplicação ServeRest:**
1. [GitHub](https://github.com/ServeRest/ServeRest).
2. [API](https://serverest.dev/#/).

- **Documentação do Cypress:**
1. [Cypress](https://docs.cypress.io/)
2. [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands/)

# Estrutura de Projeto

- O projeto foi desenvolvido utilizando o padrão de `Custom Commands`. Este padrão foi escolhido, pois ajuda melhorar a eficiência, legibilidade e manutenção dos testes, tornando o desenvolvimento de testes mais ágil e menos propenso a erros. 

- **Estrutura de Pastas:**

     📝 Por se tratar de poucos cenários de testes e baixo nível de complexidade, a estrutura das pastas foi alterada para deixar ambos os testes (E2E e API) no mesmo e repositório e o código mais fácil e organizado de entender.

```
├── cypress/                                      # Diretório principal dos testes Cypress.
    └── tests/                                    # Contém todos os testes (E2E E API) da aplicação.
        └── api/                                  # Testes de API.
            └── create_users.cy.js                # Teste de API para criação de usuários.
            └── delete_users.cy.js                # Teste de API para deleção de usuários.
            └── get_users.cy.js                   # Teste de API para listagem de usuários.
            └── update_users.cy.js                # Teste de API para atualização de usuários.
        └── front/                                # Testes E2E.
            └── register_users.cy.js              # Teste E2E para criação de usuários.
    └── fixtures/                                 # Dados de teste e fixtures.
        └── data.js                               # Geração de dados aleatórios para testes.
    └── support/                                  # Configurações de suporte do Cypress.
        └── commands.js                           # Comandos customizados do Cypress.
            └── e2e_commands.js                   # Comandos customizados para testes E2E.
            └── api_commands.js                   # Comandos customizados para testes de API.
        └── e2e.js                                # Configurações globais para testes.
    ├── package.json                              # Gerenciador de dependências e scripts do projeto .
    └── README.md                                 # Documentação do projeto.
```

# Scrits de execução:

- **Scripts "defaults":**
```
yarn test                 # Roda todos os testes em modo headless.
yarn cypress open         # Roda todos os testes em modo interativo.
```

- **Scripts Personalizados:**
```
yarn cy:e2e               # Roda os testes E2E em modo headless.
yarn cy:api               # Roda os testes API em modo headless.
```