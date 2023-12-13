import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { ElementStates } from "../../src/types/element-states";

describe('fibonacci page works correctly', function () {
    beforeEach(function () {
        cy.visit('/fibonacci');
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
        const fibNumbers = [1, 1, 2, 3, 5];

        for (let i = 0; i < fibNumbers.length; i++) {
            for (let j = 0; j <= i; j++) {
                cy.get('@circles').eq(j).should('contain', String(fibNumbers[j])).invoke('attr', 'class').and('contain', ElementStates.Default);
            }
            cy.tick(SHORT_DELAY_IN_MS);
        }
    });
}); 