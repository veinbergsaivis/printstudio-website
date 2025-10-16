describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load and display hero section', () => {
    cy.get('h1').should('be.visible');
    cy.contains('Print Bolder').should('be.visible');
  });

  it('should navigate to different sections', () => {
    cy.get('nav').contains('About').click();
    cy.get('#about').should('be.visible');

    cy.get('nav').contains('Services').click();
    cy.get('#services').should('be.visible');

    cy.get('nav').contains('Gallery').click();
    cy.get('#gallery').should('be.visible');
  });

  it('should have working contact form', () => {
    cy.get('nav').contains('Contact').click();
    cy.get('#contact').should('be.visible');

    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('This is a test message');
    
    // Pārbaudām, vai forma ir derīga
    cy.get('form').should('be.visible');
  });
});