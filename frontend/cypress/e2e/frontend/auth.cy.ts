describe('template spec', () => {

  it('can signup with original user', () => {
    cy.visit('http://localhost:4200/#/signup');

    cy.get('input[name="email"]').type('alliegator@ufl.edu');
    cy.get('input[name="username"]').type('alliegator');
    cy.get('input[name="password"]').type('abcdefghijklmnopqrstuvwxyz');
    cy.get('input[name="confirmpassword"]').type('abcdefghijklmnopqrstuvwxyz');

    cy.get('button[type="submit"]').click();

    cy.contains('Signup successful!').should('be.visible');



  });
  it('cannot signup with duplicate user', () => {
    cy.visit('http://localhost:4200/#/signup');

    cy.get('input[name="email"]').type('alliegator@ufl.edu');
    cy.get('input[name="username"]').type('alliegator');
    cy.get('input[name="password"]').type('abcdefghijklmnopqrstuvwxyz');
    cy.get('input[name="confirmpassword"]').type('abcdefghijklmnopqrstuvwxyz');

    cy.get('button[type="submit"]').click();

    cy.contains('User already exists').should('be.visible');



  });
  it('can login with correct credentials', () => {
    cy.visit('http://localhost:4200/#/login');

    cy.get('input[name="username"]').type('alliegator');
    cy.get('input[name="password"]').type('abcdefghijklmnopqrstuvwxyz');

    cy.get('button[type="submit"]').first().click();
    cy.url().should('include', '/home');
  });
  it('cant login with incorrect credentials', () => {
    cy.visit('http://localhost:4200/#/login');

    cy.get('input[name="username"]').type('alliegator');
    cy.get('input[name="password"]').type('abcdefghijklmnopqrstuvw');

    cy.get('button[type="submit"]').first().click();
    cy.url().should('include', '/login');
  });
  

})