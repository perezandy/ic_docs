describe('template spec', () => {

  it('passes', () => {
    cy.visit('http://localhost:4200/#/home')
  })

  it('visits all non-404 routes from homepage', () => {
    cy.visit('http://localhost:4200/#/home');

    cy.get('a[routerLink]').each(($link) => {
      const route = $link.attr('routerLink');
      if (route && !route.includes('404')) {
        cy.visit(`http://localhost:4200/#${route}`);
        cy.get('body').should('exist');
      }
    });
  });

  it('visits all steps of project tutorial', () => {
    cy.visit('http://localhost:4200/#/project_tutorial');

    cy.get('a[routerLink]').each(($link) => {
      const route = $link.attr('routerLink');
      if (route && !route.includes('404')) {
        cy.visit(`http://localhost:4200/#${route}`);
        cy.get('body').should('exist');
      }
    });
  });
  it('redirects to 404 on wrong url', () => {
    cy.visit('http://localhost:4200/#/nonsense');
  });
  it('can return to login from 404', () => {
    cy.visit('http://localhost:4200/#/nonsense');

    cy.get('a[routerLink]').each(($link) => {
      const route = $link.attr('routerLink');
      if (route) {
        cy.visit(`http://localhost:4200/#${route}`);
        cy.get('body').should('exist');
      }
    });
  });
  it('can enter home as guest', () => {
    cy.visit('http://localhost:4200/#/login');
    cy.contains('Continue as Guest').click();

    cy.url().should('include', '/home');
  });
  it('can go to signup from login', () => {
    cy.visit('http://localhost:4200/#/login');
    cy.contains('New to Iron Coder? Sign up here.').click();

    cy.url().should('include', '/signup');
  });
  it('can go to login from signup', () => {
    cy.visit('http://localhost:4200/#/signup');
    cy.contains('Back to login').click();

    cy.url().should('include', '/login');
  });


});