import { faker } from '@faker-js/faker';
describe('Access profile: slug in setting profile', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

     it('I Should slug in setting profile', () => {
        const namefaker = faker.person.fullName();
        const locationfaker = faker.address.city();
        const website = faker.internet.url();
        const slugname = faker.internet.username().toLowerCase();
        const facebookprofile = faker.internet.url();
        const xprofile = faker.internet.url();
        const bio = faker.person.bio();

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);

        cy.contains('label', 'Full name').parent().find('input').clear().type(namefaker);
        cy.contains('label', 'Full name').parent().find('input').should('have.value', namefaker);

        cy.contains('label', 'Location').parent().find('input').clear().type(locationfaker);
        cy.contains('label', 'Location').parent().find('input').should('have.value', locationfaker);

        cy.contains('label', 'Website').parent().find('input').clear().type(website);
        cy.contains('label', 'Website').parent().find('input').should('have.value', website);

        cy.contains('label', 'Slug').parent().find('input').clear().type(slugname);
        cy.contains('label', 'Slug').parent().find('input').should('have.value', slugname);

        cy.contains('label', 'Facebook profile').parent().find('input').clear().type(facebookprofile);
        cy.contains('label', 'Facebook profile').parent().find('input').should('have.value', facebookprofile);

        cy.contains('label', 'X (formerly Twitter) profile').parent().find('input').clear().type(xprofile);
        cy.contains('label', 'X (formerly Twitter) profile').parent().find('input').should('have.value', xprofile);

        cy.contains('label', 'Bio').parent().find('textarea').clear().type(bio);
        cy.contains('label', 'Bio').parent().find('textarea').should('have.value', bio);


        cy.get('button').contains('Save').click({force: true});
        cy.wait(500);
        cy.contains('strong', 'Owner').should('be.visible').click();
        cy.contains('label', 'Slug').parent().find('input').should('have.value', slugname);
      });

});
