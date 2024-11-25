import {faker} from '@faker-js/faker';


describe('Acces-profile-user: Verify full name text', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Should error in invalid full name', () => {

      const fullname = faker.internet.exampleEmail();

      cy.visit(LOCAL_HOST + "#/dashboard");
      cy.wait(2000);
      cy.get('div.gh-user-avatar.relative').click();
      cy.get('a[data-test-nav="user-profile"').click();
      cy.wait(2000);

      cy.contains('label', 'Full name').parent().find('input').clear().type(fullname);
      cy.contains('label', 'Full name').parent().find('input').should('have.value', fullname);

      cy.get('button').contains('Save').click({force: true});
      cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3').should('exist');

    });

});
