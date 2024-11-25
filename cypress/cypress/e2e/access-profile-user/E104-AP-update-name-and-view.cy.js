const mockData = require('./mock_data.json');
describe('Access profile: View name update', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

      it('I should update a name and view the name', () => {

        let radom_data = mockData[Math.floor(Math.random() * mockData.length)];
        const name = radom_data.fullname;

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);


        cy.contains('label', 'Full name').parent().find('input').clear().type(name);
        cy.contains('label', 'Full name').parent().find('input').should('have.value', name);

        cy.get('button').contains('Save').click({force: true});
        cy.get('h1.break-words.md\\:break-normal.text-white.md\\:text-4xl.leading-tighter').scrollIntoView({ behavior: 'smooth', block: 'center' }).should('be.visible').click();

      });

});
