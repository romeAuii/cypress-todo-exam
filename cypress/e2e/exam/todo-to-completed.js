/// <reference types="cypress" />


import { URL, Element, Data_test } from '../../fixtures/Version_001/mock_data_test.json';
let case_index = 1;

describe(`Case ${case_index++} Open URL`, () => {
    
    it('Should open to do list page', () => {
      cy.visit(URL.Test_URL)
      cy.location().should((loc) => {
        expect(loc.href).to.equal(URL.Test_URL);
      })
    })
})

describe(`Case ${case_index++} TO-DO TASKS`, () => {

    before(() => {
        cy.get('a[href="#add-item"]').click();
        Data_test.forEach((List, index) => {
            if (index == 0) cy.get(Element.Input_field).click();
            cy.get(Element.Input_field).type(List);
            cy.get(Element.Add_btn).click();
        })
    })
    
    it('Should be able to checked item to done', () => {
        cy.get('a[href="#todo"]').click();
        cy.get('#text-1').click({ force: true });
        
    })

    it('Item should be move to Completed tab ', () => {
        cy.get('a[href="#completed"]').click();
        cy.get('#completed-tasks').find('li').should('have.length', 1)
        cy.get('.mdl-list__item-primary-content').should('have.text', 'doneSaving money')
    })

})

describe(`Case ${case_index++} Delete item from TO-DO`, () => {
    
    it('Should be able to delete items from TO-DO tab', () => {
        cy.get('a[href="#todo"]').click();
        cy.get('#incomplete-tasks > :nth-child(1) > .mdl-button > .mdl-button__ripple-container').click()
    })

    it('Should not exists in TO-DO tab', () => {
        cy.get('#incomplete-tasks').find('li').should('have.length', 0)
    })

    it('Should not exists in Completed tab', () => {
        cy.get('a[href="#completed"]').click();
        cy.get('#completed-tasks').find('li').should('have.length', 1)
        cy.get('.mdl-list__item-primary-content').should('have.text', 'doneSaving money')
    })
})

describe(`Case ${case_index++} Delete item from Completed tab`, () => {
    
    it('Deleted items should not exists in Completed tab', () => {
        cy.get('#completed-tasks > :nth-child(1) > .mdl-button > .mdl-button__ripple-container').click()
        cy.get('#completed-tasks').find('li').should('have.length', 0)
    })
})