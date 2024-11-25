import { faker } from '@faker-js/faker';
describe('Access profile: view error old different password', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

     it('Should view error old different password', () => {

        const passwoldnew = faker.string.alpha(10)
        const password = faker.string.alpha(15)

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);



        cy.get('button').contains('Change password').click({force: true});

        cy.contains('label', 'Old password').parent().find('input').clear().type(passwoldnew);
        cy.contains('label', 'Old password').parent().find('input').should('have.value', passwoldnew);

        cy.contains('label', 'New password').parent().find('input').clear().type(password);
        cy.contains('label', 'New password').parent().find('input').should('have.value', password);

        cy.contains('label', 'Verify password').parent().find('input').clear().type(password);
        cy.contains('label', 'Verify password').parent().find('input').should('have.value', password);

        cy.get('button').contains('Change password').click({force: true});

        cy.get('[data-testid="toast-error"]') // Selector para el toast de error
        .should('be.visible') // Verifica que el toast sea visible
        .and('contain.text', 'Your password is incorrect.');
      });

});
