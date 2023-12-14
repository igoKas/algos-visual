import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { ElementStates } from "../../src/types/element-states";

describe('stack page works correctly', function () {
    beforeEach(function () {
        cy.visit('/stack');
    });

    it('should disable button if input is empty', function () {
        cy.get('input').should('be.empty');
        cy.get('[data-cy="Добавить"]').should('be.disabled');
    });

    it('should animate adding stack element correctly', function () {
        cy.clock();
        cy.get('input').type('4');
        cy.get('[data-cy="Добавить"]').click();

        cy.get('[data-cy="circle_content"]').as('circles');
        cy.get('@circles').eq(0).should('contain', '4').invoke('attr', 'class').and('contain', ElementStates.Changing);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').eq(0).should('contain', '4').invoke('attr', 'class').and('contain', ElementStates.Default);
    });

    it('should animate deleting stack element correctly', function () {
        cy.clock();
        cy.get('input').type('1');
        cy.get('[data-cy="Добавить"]').click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('input').type('2');
        cy.get('[data-cy="Добавить"]').click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('[data-cy="Удалить"]').click();

        cy.get('[data-cy="circle_content"]').as('circles');
        cy.get('@circles').eq(1).should('contain', '2').invoke('attr', 'class').and('contain', ElementStates.Changing);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').should('have.length', '1');
    });

    it('should clear stack correctly', function () {
        cy.clock();
        cy.get('input').type('1');
        cy.get('[data-cy="Добавить"]').click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('input').type('2');
        cy.get('[data-cy="Добавить"]').click();
        cy.tick(SHORT_DELAY_IN_MS);

        cy.get('[data-cy="circle_content"]').as('circles');
        cy.get('@circles').should('have.length', '2');
        cy.get('[data-cy="Очистить"]').click();
        cy.get('@circles').should('have.length', '0');
    });
}); 