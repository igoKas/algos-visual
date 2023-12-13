import { ElementStates } from "../../src/types/element-states";

describe('queue page works correctly', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/queue');
    });

    it('should disable button if input is empty', function () {
        cy.get('input').should('be.empty');
        cy.get('[data-cy="Добавить"]').should('be.disabled');
    });

    it('should animate adding queue element correctly', function () {
        cy.clock();
        cy.get('input').type('1');
        cy.get('[data-cy="Добавить"]').click();

        cy.get('[data-cy="circle"]').as('circles');
        cy.get('@circles').eq(0).should('contain', 'head')
            .and('contain', 'tail')
            .and('contain', '1')
            .children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Changing);
        cy.tick(500);
        cy.get('@circles').eq(0).should('contain', 'head')
            .and('contain', 'tail')
            .and('contain', '1')
            .children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Default);

        cy.get('input').type('2');
        cy.get('[data-cy="Добавить"]').click();

        cy.get('@circles').eq(0).should('contain', 'head').and('contain', '1');
        cy.get('@circles').eq(1).should('contain', 'tail').and('contain', '2');
        cy.tick(500);
    });

    it('should animate deleting queue element correctly', function () {
        cy.clock();
        cy.get('input').type('1');
        cy.get('[data-cy="Добавить"]').click();
        cy.tick(500)
        cy.get('input').type('2');
        cy.get('[data-cy="Добавить"]').click();
        cy.get('[data-cy="circle"]').as('circles');
        cy.get('@circles').eq(0).should('contain', 'head').and('contain', '0');
        cy.get('@circles').eq(1).should('contain', 'tail').and('contain', '1');
        cy.tick(500);
        cy.get('[data-cy="Удалить"]').click();

        cy.get('@circles').eq(0).should('contain', 'head')
            .and('contain', '1')
            .children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Changing);
        cy.get('@circles').eq(1).should('contain', 'tail')
            .and('contain', '2')
            .children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Default);
        cy.tick(500);
        cy.get('@circles').eq(0).children('[class*="circle_circle__"]').should('contain', '');
        cy.get('@circles').eq(1).should('contain', 'head')
            .and('contain', 'tail')
            .and('contain', '2')
            .children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Default);
    });

    it('should clear queue correctly', function () {
        cy.get('input').type('1');
        cy.get('[data-cy="Добавить"]').click();
        cy.get('input').type('2');
        cy.get('[data-cy="Добавить"]').click();
        cy.get('[data-cy="Очистить"]').click();

        cy.get('[data-cy="circle_content"]').should('have.length', 7).each(($element) => {
            cy.wrap($element).find('p').should('have.text', '');
        });
    });
}); 