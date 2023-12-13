const pages = [
  { header: 'Строка', selector: '[data-cy="recursion"]' },
  { header: 'Последовательность Фибоначчи', selector: '[data-cy="fibonacci"]' },
  { header: 'Сортировка массива', selector: '[data-cy="sorting"]' },
  { header: 'Стек', selector: '[data-cy="stack"]' },
  { header: 'Очередь', selector: '[data-cy="queue"]' },
  { header: 'Связный список', selector: '[data-cy="list"]' }
]

describe('app works correctly with routes', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  pages.forEach(({header, selector}) => {
    it(`should open ${selector.split('"')[1]} page correctly`, () => {
      cy.get(selector).click();
      cy.contains(header);
    })
  });
}); 