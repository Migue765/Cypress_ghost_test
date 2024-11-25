const mockData = require('./mock_data.json');
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

        let bios = '';

        for (let i = 0; i < 5; i++) {
          const randomData = mockData[Math.floor(Math.random() * mockData.length)];
          const bio1 = randomData.Bio;
          bios += bio1 + '\n'; // Agrega un salto de línea entre cada bio si es necesario
      }
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);

        cy.contains('label', 'Bio').parent().find('textarea').clear().type(bios);
        cy.contains('label', 'Bio').parent().find('textarea').should('have.value', bios);

        cy.get('button').contains('Save').click({force: true});
        cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3').should('have.text', 'Bio is too long');

    });

});
