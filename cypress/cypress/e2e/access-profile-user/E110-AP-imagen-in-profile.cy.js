const mockData = require('./mock_data.json');
describe('Access profile: View update image profile', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

      it('Should view image in profile ', () => {
     
        let radom_data = mockData[Math.floor(Math.random() * mockData.length)];
        const imagenFalsaUrl = radom_data.image;


        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);

        cy.log('Imagen generada:', imagenFalsaUrl);

        cy.get('#avatar').attachFile('picture.jpg'); 

        cy.get('#avatar').should('exist').and('have.prop', 'tagName', 'IMG').and('be.visible');
      });

});
