import { faker } from "@faker-js/faker"

/**
 * Gera um objeto de usuário com dados aleatórios.
 *
 * Esta função utiliza a biblioteca Faker para gerar dados como:
 * Nome, sobrenome, e-mail e senha aleatoriamente. Onde o e-mail é formatado para ser
 * uma string válida, removendo espaços e convertendo para minúsculas.
 *
 * @function createUser 
 * @returns {string} return.fullName - O nome completo do usuário.
 * @returns {string} return.email - O e-mail do usuário.
 * @returns {string} return.password - A senha do usuário.
 */
export const createUser = () => {
    const fullName = `${faker.person.firstName()} ${faker.person.lastName()}`
    const email = `${fullName.replace(/\s+/g, '').toLowerCase()}@nttamb.com.br`
    const password = faker.internet.password()
    return { fullName, email, password }
}