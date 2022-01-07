/// <reference types ="Cypress" />

describe('ticket boxes', () => {
    it('navigate to the web page', () => {
        const firstName = 'Anh'
        const lastName = 'Mai'

        cy.visit('index.html')
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type('anhtest@example.com')
        cy.get('#signature').type(`${firstName} ${lastName}`)


    })

})