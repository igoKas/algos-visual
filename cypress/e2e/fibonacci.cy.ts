import { ElementStates } from "../../src/types/element-states";

describe('fibonacci page works correctly', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/fibonacci');
    });

    it('should disable button if input is empty', function () {
        cy.get('input').should('be.empty');
        cy.get('[data-cy="Рассчитать"]').should('be.disabled');
    });

    it('should animate generating numbers correctly', function () {
        cy.clock();
        cy.get('input').type('4');
        cy.get('[data-cy="Рассчитать"]').click();

        cy.get('[data-cy="circle_content"]').as('circles');
        cy.get('@circles').eq(0).should('contain', '1').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.tick(500);
        cy.get('@circles').eq(0).should('contain', '1').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(1).should('contain', '1').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.tick(500);
        cy.get('@circles').eq(0).should('contain', '1').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(1).should('contain', '1').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(2).should('contain', '2').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.tick(500);
        cy.get('@circles').eq(0).should('contain', '1').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(1).should('contain', '1').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(2).should('contain', '2').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(3).should('contain', '3').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.tick(500);
        cy.get('@circles').eq(0).should('contain', '1').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(1).should('contain', '1').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(2).should('contain', '2').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(3).should('contain', '3').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(4).should('contain', '5').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.tick(500);
    });
}); 