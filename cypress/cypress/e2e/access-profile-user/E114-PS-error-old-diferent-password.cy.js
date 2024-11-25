const LOCAL_HOST = Cypress.env('LOCAL_HOST')
const APIREST = Cypress.env('APIREST');

describe('Access profile: view error old different password', () => {
  
    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost(); 
    });


    Cypress.on('uncaught:exception', (err, runnable) => {
        return false; 
    });

    it('Should view error old different password', () => {

        cy.request('GET', APIREST + '?schema=EditProfile').then((response) => {
                expect(response.status).to.eq(200); 

       
                let randomData = response.body[Math.floor(Math.random() * response.body.length)];

                const passwordNew = randomData.password; 
                const password = randomData.password;  


                cy.visit(LOCAL_HOST + "#/dashboard");
                cy.wait(2000);
                cy.get('div.gh-user-avatar.relative').click();
                cy.get('a[data-test-nav="user-profile"]').click();
                cy.wait(2000);

                cy.get('button').contains('Change password').click({ force: true });

                cy.contains('label', 'Old password').parent().find('input').clear().type(passwordNew);
                cy.contains('label', 'Old password').parent().find('input').should('have.value', passwordNew);

                cy.contains('label', 'New password').parent().find('input').clear().type(password);
                cy.contains('label', 'New password').parent().find('input').should('have.value', password);

                cy.contains('label', 'Verify password').parent().find('input').clear().type(password);
                cy.contains('label', 'Verify password').parent().find('input').should('have.value', password);

                cy.get('button').contains('Change password').click({ force: true });


                cy.get('[data-testid="toast-error"]')
                    .should('be.visible')
                    .and('contain.text', 'Your password is incorrect.');
            });
    });
});