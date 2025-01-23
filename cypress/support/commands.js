import locators from "./locators.js"

/**
 * Navega até a página de cadastro.
 * 
 * Este comando visita a página inicial da aplicação, verifica se a logo
 * está visível e valida se o título da página é igual a "Front - ServeRest".
 * @example
 * cy.navigateToSignUpPage()
 */
Cypress.Commands.add("navigateToSignUpPage", () => {
    cy.visit("/")
    cy.get(".imagem").should("be.visible")
    cy.title().should("eq", "Front - ServeRest")
})

/**
 * Clica no link "Cadastre-se" para usuários não registrados.
 * 
 * Este comando verifica se o texto "Não é cadastrado?" está visível
 * e, em seguida, clica no botão "Cadastre-se" para iniciar o processo
 * de registro de um novo usuário.
 * @example
 * cy.clickOnNotRegisteredLink()
 */
Cypress.Commands.add("clickOnNotRegisteredLink", () => {
    cy.get(locators.users.formText)
        .should("be.visible")
        .and("contain.text", "Não é cadastrado?")
    cy.get(locators.users.btnSignUp)
        .should("be.visible")
        .and("have.text", "Cadastre-se")
        .click()
})

/**
 * Preenche o formulário de cadastro de um novo usuário.
 * 
 * Este comando verifica se o título do formulário está visível e caso
 * os valores forem fornecidos, preenche os campos de "Nome", "Email" e "Senha".
 * Este comando possui uma exceção para aceitar valores nulos para testes de cenários
 * alternativos, que vão validar mensagens de erro dos campos do formulário.
 * @param {string} fullName - O nome completo do usuário a ser cadastrado.
 * @param {string} email - O endereço de email do usuário a ser cadastrado.
 * @param {string} password - A senha do usuário a ser cadastrada.
 * @example
 * cy.fillSignUpForm("Nome de Teste", "teste@exemplo.com", "suaSenhaSegura")
 */
Cypress.Commands.add("fillSignUpForm", (fullName, email, password) => {
    cy.get(locators.users.formTitle)
        .should("be.visible")
        .and("have.text", "Cadastro")

    if (fullName) {
        cy.get(locators.users.inputName)
            .should("be.visible")
            .and("be.enabled")
            .type(fullName)
    }
    if (email) {
        cy.get(locators.users.inputEmail)
            .should("be.visible")
            .and("be.enabled")
            .type(email)
    }
    if (password) {
        cy.get(locators.users.inputPassword)
            .should("be.visible")
            .and("be.enabled")
            .type(password)
    }
})

/**
 * Seleciona o nível de acesso do usuário.
 * 
 * Este comando verifica se a mensagem "Cadastrar como administrador?" está visível
 * e se a checkbox correspondente está habilitada. Se o tipo fornecido 
 * for "Administrator", o comando marca a checkbox de administrador. 
 * Caso contrário, será cadastrado como usuário comum
 * @example
 * cy.registerType("Administrator") - Usuário nível Administrador.
 * cy.registerType() - Usuário comum.
 */
Cypress.Commands.add("registerType", (type) => {
    cy.get(locators.users.adminText)
        .should("be.visible")
        .and("have.text", "Cadastrar como administrador?")
    cy.get(locators.users.adminCheckbox)
        .should("be.visible")
        .and("be.enabled")
    if (type === "Administrator") {
        cy.get(locators.users.adminCheckbox)
            .check()
            .should("be.checked")
    }
})

/**
 * Realiza o registro de um novo usuário.
 *
 * Este comando verifica se o botão "Cadastrar" está visível e habilitado,
 * e em seguida, clica no botão para submeter o formulário de cadastro e
 * criar um novo usuário.
 * @example
 * cy.registerUser()
 */
Cypress.Commands.add("registerUser", () => {
    cy.get(locators.users.btnSignUp)
        .should("be.visible")
        .and("have.text", "Cadastrar")
        .click()
})

/**
 * Verifica se o registro do usuário foi realizado com sucesso.
 *
 * Este comando verifica se o alerta de sucesso está visível e se a cor de fundo
 * do alerta corresponde ao valor esperado. Além disso, valida se o texto do alerta
 * indica que o cadastro foi realizado com sucesso.
 * @example
 * cy.verifySuccessfulRegistration()
 */
Cypress.Commands.add("verifySuccesfullRegistration", () => {
    cy.get(locators.users.alert)
        .should("be.visible")
        .and("have.css", "background-color", "rgb(120, 194, 173)")
    cy.get(locators.users.alertText)
        .should("be.visible")
        .and("have.text", "Cadastro realizado com sucesso")
})

/**
 * Verifica se as mensagens de erro de registro inválido estão visíveis.
 *
 * Este comando itera sobre os elementos de alerta de erro e verifica se cada um
 * deles está visível e se a cor de fundo corresponde ao valor esperado. Além disso,
 * valida se o texto dentro de cada alerta corresponde às mensagens de erro fornecidas.
 * @example
 * cy.verifyInvalidRegistration("Mensagem ou Array de Mensagens")
 */
Cypress.Commands.add("verifyInvalidRegistration", (alertMessage) => {
    cy.get(locators.users.alertError)
        .each(($el, index) => {
            cy.wrap($el)
                .should("be.visible")
                .and("have.css", "background-color", "rgb(243, 150, 154)")
            cy.wrap($el).find("span")
                .should("be.visible")
                .and("contain.text", alertMessage[index])
        })
})