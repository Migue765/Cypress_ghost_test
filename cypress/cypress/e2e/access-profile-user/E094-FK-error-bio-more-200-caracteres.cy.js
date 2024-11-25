import { faker } from '@faker-js/faker';
describe('Access profile: Update bio ', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });


      it('I should see error update more 200 caracters', () => {

        const bio1 = faker.lorem.words(100);

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);

        cy.contains('label', 'Bio').parent().find('textarea').clear().type(bio1);
        cy.contains('label', 'Bio').parent().find('textarea').should('have.value', bio1);

        cy.get('button').contains('Save').click({force: true});
        cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3').should('have.text', 'Bio is too long');

      });

});
