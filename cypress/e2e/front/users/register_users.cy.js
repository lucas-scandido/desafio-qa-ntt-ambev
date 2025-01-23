///<reference types="cypress"/>

import { faker } from "@faker-js/faker"

describe("Cadastro de usuários", () => {
    const fullName = `${faker.person.firstName()} ${faker.person.lastName()}`
    const email = `${fullName.toLowerCase()}@teste.com.br`
    const password = faker.internet.password()

    before(() => {
        cy.navigateToSignUpPage()
        cy.clickOnNotRegisteredLink()
    })

    context("Inserção de dados válidos para cadastro", () => {
        it("Deve realizar o cadastro de um usuário como administrador com sucesso", () => {
            cy.fillSignUpForm(fullName, email, password)
            cy.registerType("Administrator")
            cy.registerUser()
            cy.verifySuccesfullRegistration()
        })
    })

    context("Inserção de dados inválidos para cadastro", { testIsolation: false }, () => {
        const emptyField = ""
        const alertMessage = [
            "Nome é obrigatório",
            "Email é obrigatório",
            "Password é obrigatório"
        ]

        beforeEach(() => {
            cy.reload()
        })

        it("Quando tentar realizar um cadastro sem o preenchimento dos campos obrigatórios, deve exibir 3 mensagens de erro de acordo com seus respectivo campo", () => {
            cy.registerUser()
            cy.verifyInvalidRegistration(alertMessage)
        })

        it("Quando tentar realizar um cadastro sem o preenchimento o campo 'Nome', deve exibir uma mensagem de erro 'Nome é obrigatório'", () => {
            cy.fillSignUpForm(emptyField, email, password)
            cy.registerUser()
            cy.verifyInvalidRegistration(alertMessage[0])
        })

        it("Quando tentar realizar um cadastro sem o preenchimento o campo 'E-mail', deve exibir uma mensagem de erro 'Email é obrigatório'", () => {
            cy.fillSignUpForm(fullName, emptyField, password)
            cy.registerUser()
            cy.verifyInvalidRegistration(alertMessage[1])
        })

        it("Quando tentar realizar um cadastro sem o preenchimento o campo 'Senha', deve exibir uma mensagem de erro 'Password é obrigatório'", () => {
            cy.fillSignUpForm(fullName, email, emptyField)
            cy.registerUser()
            cy.verifyInvalidRegistration(alertMessage[2])
        })
    })
})