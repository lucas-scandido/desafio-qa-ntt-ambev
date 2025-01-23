///<reference types="cypress"/>

describe("API: Usuários", () => {
    let id

    context("Listagem de usuários", () => {
        it("GET: Deve listar todos os usuários cadastrados", () => {
            cy.apiUsers({
                method: "GET",
                option: true
            }).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body).to.have.property('quantidade').that.is.a('number')
                expect(response.body.usuarios).to.not.be.empty

                id = response.body.usuarios[0]._id
            })
        })

        it("GET: Deve listar um usuário pelo 'ID'", () => {
            cy.apiUsers({
                method: "GET",
                userId: id,
                option: true
            }).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body).to.not.be.empty
            })
        })
    })

    context("Listagem de usuários com dados vazio ou inválido", () => {
        const validateResponse = (response) => {
            expect(response.status).to.eq(400)
            expect(response.body.message).to.deep.equal("Usuário não encontrado")
        }

        it("GET: Deve retornar um erro ao tentar listar por um 'ID' de usuário não existente", () => {
            cy.apiUsers({ userId: "55HGG7863A32SWW", option: false }).then(validateResponse)
        })

        it("GET: Deve retornar um erro ao tentar listar um usuário passando o valor parâmetro 'ID' como number", () => {
            cy.apiUsers({ userId: 12345, option: false }).then(validateResponse)
        })
    })
})