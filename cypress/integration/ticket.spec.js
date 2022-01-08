/// <reference types ="Cypress" />

describe('ticket boxes', () => {
    beforeEach(() => {
        cy.visit('index.html')
    })
    it('navigate to the web page', () => {
        const firstName = 'Anh'
        const lastName = 'Mai'

        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type('anhtest@example.com')
        //cy.get('#signature').type(`${firstName} ${lastName}`)
        cy.get('#signature').type(firstName + ' ' + lastName)
    })

    it('should display name for the purchase agreement', () => {
        const firstName = 'Anh'
        const lastName = 'Mai'
        const fullName = `${firstName} ${lastName}`

        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.contains('fieldset', 'Purchase Agreement').find('p').should('contain', `${firstName} ${lastName}`)
        cy.get('.agreement fieldset').should('contain', `${firstName} ${lastName}`)
        cy.get('.reset').click()
        cy.get('.agreement fieldset').should('not.contain', `${firstName} ${lastName}`)
        cy.get('.agreement fieldset').should('contain', 'I, , wish to buy 1 General Admission ticket. I understand that all ticket sales are final.')
        cy.get('.form-row .form-field').eq(0).find('input').should('contain', '')

        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)

        cy.contains('fieldset', 'Purchase Agreement').find('p').should('contain', `${fullName}`)

    })

    it('should display the proper purchange agreement when selecting ticket quantity', () => {
        const numberOfTicket = '2'
        const firstName = 'Anh'
        const lastName = 'Mai'
        const email = 'anhmai@example.com'
        const fullName = `${firstName} ${lastName}`

        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type(email)
        cy.get('#signature').type(fullName)

        cy.get('#ticket-quantity').select(numberOfTicket)
        cy.get('.agreement fieldset').should('contain', `${numberOfTicket} General Admission ticket`)
        cy.get('button[type="submit"]').should('be.disabled')

        cy.contains('fieldset', 'Purchase Agreement').find('input').check()
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('contain', 'Ticket(s) successfully ordered.')
        cy.get('button[type="submit"]').should('be.disabled')
    })

    it('loops though the ticket quantity and assert purchase payment text', () => {
        cy.get('#ticket-quantity option').each(option => {
            const optionValue = option.text()
            cy.get('#ticket-quantity').select(optionValue)
            cy.get('.agreement fieldset').should('contain', `${optionValue} General Admission ticket`)
        })
    })

    it.only('submits the form with custom command', () => {
        const customer = {
            firstName: 'Anh',
            lastName: 'Mai',
            email: 'anhmai@example.com',
            fullname: function() { return `${this.firstName} ${this.lastName}` }
        }
        cy.log(customer.fullname())

        cy.fillMandatoryFields(customer)
        
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('contain', 'Ticket(s) successfully ordered.')

    })

})