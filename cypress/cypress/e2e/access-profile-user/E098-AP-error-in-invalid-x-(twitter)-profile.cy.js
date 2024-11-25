const mockData = require('./mock_data.json');
describe('Access profile: View error in invalid x profile', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

      it('Should error in invalid x profile', () => {

        let radom_data = mockData[Math.floor(Math.random() * mockData.length)];
        const xprofile = radom_data.Email;
        const Bio = radom_data.Bio;

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);


        cy.contains('label', 'X (formerly Twitter) profile').parent().find('input').clear().type(xprofile);
        cy.contains('label', 'X (formerly Twitter) profile').parent().find('input').should('have.value', xprofile);

        cy.contains('label', 'Bio').parent().find('textarea').clear().type(Bio);
        cy.contains('label', 'Bio').parent().find('textarea').should('have.value', Bio);

        cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3').should('have.text', 'Your Username is not a valid Twitter Username');

      });

});
