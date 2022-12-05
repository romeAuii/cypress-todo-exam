/// <reference types="cypress" />


import { URL, Element, Data_tests_add } from '../../fixtures/Version_001/mock_data_test.json';
let case_index = 1;

describe(`Case ${case_index++} Open URL`, () => {
  
  it('Should open to do list page', () => {
    cy.visit(URL.Test_URL)
    cy.location().should((loc) => {
      expect(loc.href).to.equal(URL.Test_URL);
    })
  })
  it('Header page Should display correct', () => {
    cy.get(Element.Header_Page).should('have.text', 'To Do List')
  })

})

describe(`Case ${case_index++} Add item`, () => {

  it('Should be able to add new item ', () => {
    Data_tests_add.forEach((List, index) => {
      if (index == 0)
        cy.get(Element.Input_field).click({ force: true });
      cy.get(Element.Input_field).type(List);
      cy.get(Element.Add_btn).click({ force: true });
    });
  })

  it('New item should be display in TO-DO TASK tab', () => {
    cy.get(Element.ToDoTask_Tab).click({ force: true });
    Data_tests_add.forEach((List, index) => {
      cy.get('#text-' + (index + 1)).should('have.text', (List))
    });

  })

  it('Should not add empty input ', () => {
    cy.get(Element.Input_field).click({ force: true });
    cy.get(Element.Add_btn).click({ force: true });
    cy.get(Element.ToDoTask_Tab).click({ force: true });
    cy.get('#incomplete-tasks').find("li").should('have.length', Data_tests_add.length )

  })

})