///<reference types="cypress"/>

import { createUser } from "../../../fixtures/data"

describe("API: Usuários", () => {
    let adminId, commonId, sameEmail, userData

    beforeEach(() => {
        userData = createUser()
    })

    after(() => {
        const userIdsToDelete = [adminId, commonId]

        userIdsToDelete.forEach(id => {
            cy.apiUsers({
                method: "DELETE",
                userId: id,
                option: true
            })
        })
    })

    context("Inserção de dados válidos para cadastro", () => {
        const newUser = (isAdmin) => {
            return cy.apiUsers({
                method: "POST",
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: isAdmin,
                option: true
            }).then((response) => {
                validateResponse(response)
                return response.body._id
            })
        }

        const validateResponse = (response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.deep.equal("Cadastro realizado com sucesso")
            expect(response.body).to.have.property('_id')
            expect(response.body._id).to.not.be.empty
        }

        it("POST: Deve realizar o cadastro de um usuário como administrador", () => {
            sameEmail = userData.email

            newUser("true").then((id) => {
                adminId = id
            })
        })

        it("POST: Deve realizar o cadastro de um usuário comum", () => {
            newUser("true").then((id) => {
                commonId = id
            })
        })
    })

    context("Inserção de dados inválidos para cadastro", () => {
        const validateErrorResponse = (response, status, message) => {
            expect(response.status).to.eq(status)
            expect(response.body).to.deep.equal(message)
        }

        it("POST: Deve retornar um erro ao tentar cadastrar um usuário passando o valor do campo 'Nome' vazio", () => {
            cy.apiUsers({
                method: "POST",
                userName: "",
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { nome: "nome não pode ficar em branco" })
            })
        })

        it("POST: Deve retornar um erro ao tentar cadastrar um usuário passando o valor do campo 'Nome' como number", () => {
            cy.apiUsers({
                method: "POST",
                userName: 12345,
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { nome: "nome deve ser uma string" })
            })
        })

        it("POST: Deve retornar um erro ao tentar cadastrar um usuário passando o valor do campo 'E-mail' vazio", () => {
            cy.apiUsers({
                method: "POST",
                userName: userData.fullName,
                userEmail: "",
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { email: "email não pode ficar em branco" })
            })
        })

        it("POST: Deve retornar um erro ao tentar cadastrar um usuário passando o valor do campo 'E-mail' inválido", () => {
            cy.apiUsers({
                method: "POST",
                userName: userData.fullName,
                userEmail: "teste.nttamb.com.br",
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { email: "email deve ser um email válido" })
            })
        })

        it("POST: Deve retornar um erro ao tentar cadastrar um usuário passando o valor do campo 'E-mail' como number", () => {
            cy.apiUsers({
                method: "POST",
                userName: userData.fullName,
                userEmail: 12345,
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { email: "email deve ser uma string" })
            })
        })

        it("POST: Deve retornar um erro ao tentar cadastrar um usuário passando o valor do campo 'Password' vazio", () => {
            cy.apiUsers({
                method: "POST",
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: "",
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { password: "password não pode ficar em branco" })
            })
        })

        it("POST: Deve retornar um erro ao tentar cadastrar um usuário passando o valor do campo 'Password' como number", () => {
            cy.apiUsers({
                method: "POST",
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: 12345,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { password: "password deve ser uma string" })
            })
        })

        it("POST: Deve retornar um erro ao tentar cadastrar um usuário passando o valor do campo 'Administrador' vazio", () => {
            cy.apiUsers({
                method: "POST",
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: "",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { administrador: "administrador deve ser 'true' ou 'false'" })
            })
        })

        it("POST: Deve retornar um erro ao tentar cadastrar um usuário passando o valor do campo 'Administrador' inválido", () => {
            cy.apiUsers({
                method: "POST",
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: "yes",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { administrador: "administrador deve ser 'true' ou 'false'" })
            })
        })

        it("POST: Deve retornar um erro ao tentar cadastrar um usuário passando o valor do campo 'Administrador' como number", () => {
            cy.apiUsers({
                method: "POST",
                userName: userData.fullName,
                userEmail: userData.email,
                userPassword: userData.password,
                administrator: 1,
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { administrador: "administrador deve ser 'true' ou 'false'" })
            })
        })

        it("POST: Deve retornar um erro ao tentar cadastrar um usuário com dados já existentes", () => {
            cy.apiUsers({
                method: "POST",
                userName: userData.fullName,
                userEmail: sameEmail,
                userPassword: userData.password,
                administrator: "true",
                option: false
            }).then((response) => {
                validateErrorResponse(response, 400, { message: "Este email já está sendo usado" })
            })
        })
    })
})