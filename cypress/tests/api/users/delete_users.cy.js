///<reference types="cypress"/>

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
    
    context("Deleção de usuários com dados válidos", () => {
        it("DELETE: Deve deletar um usuário pelo 'ID'", () => {
            cy.apiUsers({
                method: "DELETE",
                userId: id,
                option: true
            }).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.message).to.deep.equal("Registro excluído com sucesso")
            })
        })
    })

    context("Deleção de usuários com dados vazio ou inválido", () => {
        it("DELETE: Deve retornar um erro ao tentar deletar um usuário passando o valor o parâmetro 'ID' vazio", () => {
            cy.apiUsers({
                method: "DELETE",
                userId: null,
                option: false
            }).then((response) => {
                expect(response.status).to.equal(405)
                expect(response.body.message).to.deep.equal("Não é possível realizar DELETE em /usuarios. Acesse https://serverest.dev para ver as rotas disponíveis e como utilizá-las.")
            })
        })

        it("DELETE: Deve retornar um erro ao tentar deletar um usuário passando o valor o parâmetro 'ID' como inválido", () => {
            cy.apiUsers({
                method: "DELETE",
                userId: "12345",
                option: false
            }).then((response) => {
                //Seria interessante reportar e solicitar a alteração e tratamento do status code 
                expect(response.status).to.equal(200)
                expect(response.body.message).to.deep.equal("Nenhum registro excluído")
            })
        })
    })
})