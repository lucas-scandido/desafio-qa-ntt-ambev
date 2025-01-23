///<reference types="cypress"/>

import { faker } from "@faker-js/faker"
import { createUser } from "../../../fixtures/data"

describe("API: Usuários", () => {
    let id, userData

    before(() => {
        userData = createUser()

        cy.apiUsers({
            method: "POST",
            userName: userData.fullName,
            userEmail: userData.email,
            userPassword: userData.password,
            administrator: "true",
            option: true
        }).then((response) => {
            id = response.body._id
        })
    })

    after(() => {
        cy.apiUsers({
            method: "DELETE",
            userId: id,
            option: true
        })
    })

    context("Atualização de usuários com dados válidos", () => {
        const newName = `${faker.person.firstName()} ${faker.person.lastName()}`
        const newEmail = `${newName.replace(/\s+/g, '').toLowerCase()}@nttamb.com.br`
        const newPassword = faker.internet.password()
        const validateResponse = (response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.deep.equal("Registro alterado com sucesso")
        }

        it("PUT: Deve atualizar os dados de 'Nome' de um usuário", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: newName,
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: "true",
                option: true
            }).then(validateResponse)
        })

        it("PUT: Deve atualizar os dados de 'E-mail' de um usuário", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: userData.fullName,
                userEmail: newEmail,
                userPassword: userData.password,
                administrator: "true",
                option: true
            }).then(validateResponse)
        })

        it("PUT: Deve atualizar os dados de 'Senha' de um usuário", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: newPassword,
                administrator: "true",
                option: true
            }).then(validateResponse)
        })
    })

    context("Atualização de usuários com dados inválidos", () => {
        const validateErrorResponse = (response, status, message) => {
            expect(response.status).to.eq(status)
            expect(response.body).to.deep.equal(message)
        }

        it("PUT: Deve retornar um erro ao tentar atualizar um usuário passando o valor do campo 'Nome' vazio", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: "",
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { nome: "nome não pode ficar em branco" })
            })
        })

        it("PUT: Deve retornar um erro ao tentar atualizar um usuário passando o valor do campo 'Nome' como number", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: 12345,
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { nome: "nome deve ser uma string" })
            })
        })

        it("PUT: Deve retornar um erro ao tentar atualizar um usuário passando o valor do campo 'E-mail' vazio", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: userData.fullName,
                userEmail: "",
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { email: "email não pode ficar em branco" })
            })
        })

        it("PUT: Deve retornar um erro ao tentar atualizar um usuário passando o valor do campo 'E-mail' inválido", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: userData.fullName,
                userEmail: "teste.nttamb.com.br",
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { email: "email deve ser um email válido" })
            })
        })

        it("PUT: Deve retornar um erro ao tentar atualizar um usuário passando o valor do campo 'E-mail' como number", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: userData.fullName,
                userEmail: 12345,
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { email: "email deve ser uma string" })
            })
        })

        it("PUT: Deve retornar um erro ao tentar atualizar um usuário passando o valor do campo 'Password' vazio", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: "",
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { password: "password não pode ficar em branco" })
            })
        })

        it("PUT: Deve retornar um erro ao tentar atualizar um usuário passando o valor do campo 'Password' como number", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: 12345,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { password: "password deve ser uma string" })
            })
        })

        it("PUT: Deve retornar um erro ao tentar atualizar um usuário passando o valor do campo 'Administrador' vazio", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: "",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { administrador: "administrador deve ser 'true' ou 'false'" })
            })
        })

        it("PUT: Deve retornar um erro ao tentar atualizar um usuário passando o valor do campo 'Administrador' inválido", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: "yes",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { administrador: "administrador deve ser 'true' ou 'false'" })
            })
        })

        it("PUT: Deve retornar um erro ao tentar atualizar um usuário passando o valor do campo 'Administrador' como number", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: 1,
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { administrador: "administrador deve ser 'true' ou 'false'" })
            })
        })

        it("PUT: Deve retornar um erro ao tentar atualizar um usuário com dados já existentes", () => {
            cy.apiUsers({
                method: "PUT",
                userId: id,
                userName: userData.fullName,
                userEmail: "fulano@qa.com",
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { message: "Este email já está sendo usado" })
            })
        })
    })
})