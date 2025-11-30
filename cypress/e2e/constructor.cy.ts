describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('should show ingredients from mock data', () => {
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.contains('Соус Spicy-X').should('exist');
  });

  it('should add ingredients to constructor', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"] button').click();
    cy.get('[data-cy="constructor-bun-1"]').contains('Краторная булка N-200i').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').contains('Краторная булка N-200i').should('exist');

    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"] button').click();
    cy.get('[data-cy="constructor-ingredients"]').contains('Биокотлета из марсианской Магнолии').should('exist');

    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"] button').click();
    cy.get('[data-cy="constructor-ingredients"]').contains('Соус Spicy-X').should('exist');
  });

  it('should open ingredient modal', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').contains('Краторная булка N-200i');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('should close modal on overlay click', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});

describe('Order Creation', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as('login');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');

    cy.visit('/login');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.wait('@login');

    cy.url().should('include', '/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should create order', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"] button').click();
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"] button').click();
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"] button').click();

    cy.get('[data-cy="order-button"]').click();

    cy.wait('@postOrder').its('request.body').should('deep.equal', {
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093c"
      ]
    });

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').contains('12345');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="constructor-bun-1"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-2"]').should('not.exist');
    cy.get('[data-cy="constructor-ingredients"]').should('not.contain', 'Биокотлета из марсианской Магнолии');
    cy.get('[data-cy="constructor-ingredients"]').should('not.contain', 'Соус Spicy-X');
    cy.get('[data-cy="constructor-ingredients"]').contains('Выберите начинку').should('exist');
  });
});

