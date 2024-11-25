const LOCAL_HOST = Cypress.env('LOCAL_HOST')
const APIREST = Cypress.env('APIREST');

describe('Access profile: View error invalid website', () => {

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost(); 
    });


    Cypress.on('uncaught:exception', (err, runnable) => {
        return false; 
    });

    it('Should view error in invalid website', () => {
        cy.request('GET', APIREST + '?schema=EditProfile').then((response) => {
            expect(response.status).to.eq(200); 
                expect(response.status).to.eq(200); 

                let randomData = response.body[Math.floor(Math.random() * response.body.length)];
                const website = randomData.Slug; 


                cy.visit(LOCAL_HOST + "#/dashboard");
                cy.wait(2000);
                cy.get('div.gh-user-avatar.relative').click();
                cy.get('a[data-test-nav="user-profile"]').click();
                cy.wait(2000);


                cy.contains('label', 'Website').parent().find('input').clear().type(website);
                cy.contains('label', 'Website').parent().find('input').should('have.value', website);


                cy.get('button').contains('Save').click({ force: true });

                cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3')
                    .should('have.text', 'Enter a valid URL');
            });
    });
});