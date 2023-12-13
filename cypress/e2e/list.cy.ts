import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { ElementStates } from "../../src/types/element-states";

describe('list page works correctly', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/list');
    });

    it('should disable add buttons and delete by index button if input is empty', function () {
        cy.get('input').should('be.empty');
        cy.get('[data-cy="Добавить в head"]').should('be.disabled');
        cy.get('[data-cy="Добавить в tail"]').should('be.disabled');
        cy.get('[data-cy="Добавить по индексу"]').should('be.disabled');
        cy.get('[data-cy="Удалить по индексу"]').should('be.disabled');
    });

    it('should render default list correctly', function () {
        cy.get('[data-cy="circle"]').should('have.length', 4).each(($element, index) => {
            cy.wrap($element).should('contain', index);
            if (index === 0) {
                cy.wrap($element).should('contain', 'head');
            }
            if (index === 3) {
                cy.wrap($element).should('contain', 'tail');
            }
            if (index !== 3) {
                cy.wrap($element).next('svg');
            }
        });
    });

    it('should animate adding list element to head correctly', function () {
        cy.clock();
        cy.get('input').eq(0).type('1');
        cy.get('[data-cy="Добавить в head"]').click();

        cy.get('[data-cy="circle"]').first().as('circle');
        cy.get('@circle').find('[class*="circle_small__"]').invoke('attr', 'class').and('contain', ElementStates.Changing);
        cy.get('@circle').find('[class*="circle_small__"]').contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circle').next('svg');
        cy.get('@circle').should('contain', 'head')
            .and('contain', '1')
            .children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Modified);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circle')
            .children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Default);
    });

    it('should animate adding list element to tail correctly', function () {
        cy.clock();
        cy.get('input').eq(0).type('1');
        cy.get('[data-cy="Добавить в tail"]').click();

        cy.get('[data-cy="circle"]').last().as('circle');
        cy.get('@circle').find('[class*="circle_small__"]').invoke('attr', 'class').and('contain', ElementStates.Changing);
        cy.get('@circle').find('[class*="circle_small__"]').contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circle').should('contain', 'tail')
            .and('contain', '1')
            .children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Modified);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circle')
            .children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Default);
    });

    it('should animate adding list element by index correctly', function () {
        cy.clock();
        cy.get('input').eq(0).type('1');
        cy.get('input').eq(1).type('2');
        cy.get('[data-cy="Добавить по индексу"]').click();

        cy.get('[data-cy="circle"]').each(($element, index) => {
            if (index < 3) {
                cy.wrap($element).find('[class*="circle_small__"]').invoke('attr', 'class').and('contain', ElementStates.Changing);
                cy.wrap($element).find('[class*="circle_small__"]').contains('1');
                cy.tick(SHORT_DELAY_IN_MS);
            }
        });
        cy.get('[data-cy="circle"]').eq(2).as('circle');
        cy.get('@circle').should('contain', '1')
            .and('contain', '2')
            .children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Modified);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circle')
            .children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Default);
    });

    it('should animate deleting list element from head correctly', function () {
        cy.clock();
        cy.get('[data-cy="circle"]').should('have.length', 4).first().then(($element) => {
            const text = $element.children('[class*="circle_circle__"]').text();
            cy.get('[data-cy="Удалить из head"]').click();
            cy.wrap($element).children('[class*="circle_circle__"]').find('p').should('have.text', '');
            cy.wrap($element).find('[data-cy="small_circle"]')
                .children('[class*="circle_circle__"]').invoke('attr', 'class')
                .and('contain', ElementStates.Changing)
                .then(() => cy.wrap($element).find('[data-cy="small_circle"]').find('p').should('have.text', text));
        })
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('[data-cy="circle"]').should('have.length', 3);
    });

    it('should animate deleting list element from tail correctly', function () {
        cy.clock();
        cy.get('[data-cy="circle"]').should('have.length', 4).last().then(($element) => {
            const text = $element.children('[class*="circle_circle__"]').text();
            cy.get('[data-cy="Удалить из tail"]').click();
            cy.wrap($element).children('[class*="circle_circle__"]').find('p').should('have.text', '');
            cy.wrap($element).find('[data-cy="small_circle"]')
                .children('[class*="circle_circle__"]').invoke('attr', 'class')
                .and('contain', ElementStates.Changing)
                .then(() => cy.wrap($element).find('[data-cy="small_circle"]').find('p').should('have.text', text));
        })
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('[data-cy="circle"]').should('have.length', 3);
    });

    it('should animate deleting list element by index correctly', function () {
        cy.clock();
        const indexInput = '2';
        cy.get('input').eq(1).type(indexInput);
        cy.get('[data-cy="Удалить по индексу"]').click();

        cy.get('[data-cy="circle"]').should('have.length', 4).each(($element, index) => {
            if (index < Number(indexInput)) {
                cy.wrap($element).children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Changing);
                cy.tick(SHORT_DELAY_IN_MS);
            }
            if (index === Number(indexInput)) {
                const text = $element.children('[class*="circle_circle__"]').text();
                cy.wrap($element).children('[class*="circle_circle__"]').invoke('attr', 'class').and('contain', ElementStates.Changing);
                cy.tick(SHORT_DELAY_IN_MS);
                cy.wrap($element).find('[data-cy="small_circle"]')
                    .children('[class*="circle_circle__"]').invoke('attr', 'class')
                    .and('contain', ElementStates.Changing)
                    .then(() => cy.wrap($element).find('[data-cy="small_circle"]').find('p').should('have.text', text));
            }
        });
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('[data-cy="circle"]').should('have.length', 3);
    });
}); 