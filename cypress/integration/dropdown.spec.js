const SELECT = '.Select'
const SELECT_PLACEHOLDER = '.Select-placeholder'
const SELECT_CONTROL = '.Select-control'
const SELECT_OPTIONS = '.Select-menu'
const SELECT_OPTION = '.Select-option'
const SELECT_ARROW = '.Select-arrow-zone'
const SELECT_INPUT = '.Select-input input'
const SELECTED = '.Select-value'
const CLEAR_ALL = ".Select-clear-zone"

describe('Dropdown states', () => {
    beforeEach(() => {
        //cy.server();
        //cy.route('GET', 'http://localhost:3001/states', 'fixture:states').as('states');
        cy.visit('/');
    });

    it('should display closed select', () => {
        cy.get(SELECT)
            .should('not.have.class', 'is-open');
        cy.get(`${SELECT_OPTIONS} div`)
            .should('not.be.visible');
    })

    it('should display a list of options on Select field click', () => {
        cy.get(SELECT)
            .should('be.visible')
            .click()
            .should('have.class', 'is-open');

        cy.get(`${SELECT_OPTIONS} div`)
            .should('have.length', 51);
    })

    it('should toggle list of options on select arrow click', () => {
        cy.get(SELECT_ARROW)
            .click();
        cy.get(SELECT)
            .should('have.class', 'is-open')
            .and('be.visible');
        cy.get(`${SELECT_OPTIONS} div`)
            .should('have.length', 51);

        cy.get(SELECT_ARROW)
            .click();
        cy.get(SELECT)
            .should('not.have.class', 'is-open').and('be.visible');
        cy.get(`${SELECT_OPTIONS} div`)
            .should('have.length', 0);
    })

    it('should display names of 3 states after typing \'al\'', () => {
        cy.get(SELECT_INPUT)
            .type('al', { force: true });
        cy.get(SELECT)
            .should('have.class', 'is-open')
            .and('be.visible');
        cy.get(`${SELECT_OPTIONS} div`)
            .should('have.length', 3);
    })

    it('should select an option after clicking it', () => {
        cy.get(SELECT)
            .click();
        cy.get(`${SELECT_OPTIONS} div:nth-child(3)`)
            .click();

        cy.get(SELECTED)
            .should('have.length', 1);
        cy.get(`${SELECTED}:first-child>.Select-value-label`)
            .should('contain', 'Arizona');
    })

    it('should remove the option after clicking on its closing button', () => {
        cy.get(SELECT)
            .click();
        cy.get(`${SELECT_OPTIONS} div:nth-child(3)`)
            .click();

        cy.get(SELECTED)
            .should('have.length', 1);

        cy.get(`${SELECTED}:first-child>.Select-value-icon`)
            .click();
        cy.get(SELECTED)
            .should('have.length', 0);
    })

    it('should remove all the children after clicking on ', () => {
        cy.get(SELECT)
            .click();
        cy.get(`${SELECT_OPTIONS} div:nth-child(3)`)
            .click();
        cy.get(SELECT_INPUT)
            .click();
        cy.get(`${SELECT_OPTIONS} div:nth-child(18)`)
            .click();
        cy.get(SELECT_INPUT)
            .click();
        cy.get(`${SELECT_OPTIONS} div:nth-child(35)`)
            .click();

        cy.get(SELECTED)
            .should('have.length', 3);

        cy.get(CLEAR_ALL)
            .click();
        cy.get(SELECTED)
            .should('have.length', 0);
    })    
})