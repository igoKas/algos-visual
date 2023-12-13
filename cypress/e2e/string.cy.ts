import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { ElementStates } from "../../src/types/element-states";

describe('string page works correctly', function () {
    beforeEach(function () {
        cy.visit('/recursion');
    });

    it('should disable button if input is empty', function () {
        cy.get('input').should('be.empty');
        cy.get('[data-cy="Развернуть"]').should('be.disabled');
    });

    it('should animate reversing string correctly', function () {
        cy.clock();
        cy.get('input').type('abcd');
        cy.get('[data-cy="Развернуть"]').click();

        cy.get('[data-cy="circle_content"]').as('circles');
        cy.get('@circles').eq(0).should('contain', 'a').invoke('attr', 'class').and('contain', ElementStates.Changing);
        cy.get('@circles').eq(1).should('contain', 'b').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(2).should('contain', 'c').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(3).should('contain', 'd').invoke('attr', 'class').and('contain', ElementStates.Changing);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').eq(0).should('contain', 'd').invoke('attr', 'class').and('contain', ElementStates.Modified);
        cy.get('@circles').eq(1).should('contain', 'b').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(2).should('contain', 'c').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.get('@circles').eq(3).should('contain', 'a').invoke('attr', 'class').and('contain', ElementStates.Modified);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').eq(0).should('contain', 'd').invoke('attr', 'class').and('contain', ElementStates.Modified);
        cy.get('@circles').eq(1).should('contain', 'b').invoke('attr', 'class').and('contain', ElementStates.Changing);
        cy.get('@circles').eq(2).should('contain', 'c').invoke('attr', 'class').and('contain', ElementStates.Changing);
        cy.get('@circles').eq(3).should('contain', 'a').invoke('attr', 'class').and('contain', ElementStates.Modified);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').eq(0).should('contain', 'd').invoke('attr', 'class').and('contain', ElementStates.Modified);
        cy.get('@circles').eq(1).should('contain', 'c').invoke('attr', 'class').and('contain', ElementStates.Modified);
        cy.get('@circles').eq(2).should('contain', 'b').invoke('attr', 'class').and('contain', ElementStates.Modified);
        cy.get('@circles').eq(3).should('contain', 'a').invoke('attr', 'class').and('contain', ElementStates.Modified);
        cy.tick(SHORT_DELAY_IN_MS);
    });
}); 