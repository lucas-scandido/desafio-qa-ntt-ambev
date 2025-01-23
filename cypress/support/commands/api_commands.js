/**
 * Realiza o cadastro, listagem e atualização e deleção de um novo usuário na API.
 *
 * Este comando envia uma requisição POST, GET, PUT e DELETE para o endpoint de "usuários" da API.
 * O corpo da requisição é construído com base nos parâmetros fornecidos e é opcional dependendo do método HTTP.
 * Caso for POST, o body será necessário. Já para PUT o body e ID do usuário são necessários. 
 * Para GET, poderá ser buscado com ou sem o parâmetro ID do usuário.
 * Já para DELETE, apenas o ID do usuário é necessário.
 * @param {string} method - O método HTTP a ser utilizado (GET, POST, PUT, DELETE).
 * @param {string} userId - O ID do usuário a ser buscado ou modificado. 
 * @param {string} userName- O nome do usuário a ser criado ou atualizado. 
 * @param {string} userEmail - O e-mail do usuário a ser criado ou atualizado. 
 * @param {string} userPassword - A senha do usuário a ser criada ou atualizada. 
 * @param {string} administrator - "True" ou "False". Indica se o usuário é nível administrador. 
 * @param {boolean} option -"True" para status 2xx e 3xx e "False" para status 4xx.
 * @example
 * // Criar ou editar um novo usuário
 * cy.apiUsers({
 *     method: "POST" ou "PUT",
 *     userId: "Caso a request seja PUT",    
 *     userName: "Novo Usuário",
 *     userEmail: "novo@usuario.com",
 *     userPassword: "senha123",
 *     administrator: "true",
 *     option: true
 * })
 * @example
 * // Listar um ou todos os usuários
 * cy.apiUsers({
 *     method: "GET",
 *     userId: "Para listar apenas um usuário",
 *     option: true
 * })
 * @example
 * // Deletar um usuário
 * cy.apiUsers({
 *     method: "DELETE",
 *     userId: "12345",
 *     option: true
 * })
 */
Cypress.Commands.add("apiUsers", ({ method, userId, userName, userEmail, userPassword, administrator = "", option }) => {
    const url = userId ? `${Cypress.config("apiUrl")}/usuarios/${userId}` : `${Cypress.config("apiUrl")}/usuarios`
    const requestBody = (method === 'POST' || method === 'PUT') ? {
        "nome": userName,
        "email": userEmail,
        "password": userPassword,
        "administrador": administrator
    } : undefined

    cy.api({
        method: method,
        url: url,
        body: requestBody,
        failOnStatusCode: option
    })
})