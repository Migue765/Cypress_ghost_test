const LOCAL_HOST = Cypress.env('LOCAL_HOST');
const APIREST = Cypress.env('APIREST');

describe('Access profile: View error invalid email', () => {

    

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });
    

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('I should error in invalid email', () => {


        cy.request('GET', APIREST).then((response) => {

            expect(response.status).to.eq(200);


            let radom_data = response.body[Math.floor(Math.random() * response.body.length)];
            const email = radom_data.fullname;  


            cy.visit(LOCAL_HOST + "#/dashboard");
            cy.wait(2000);
            cy.get('div.gh-user-avatar.relative').click();
            cy.get('a[data-test-nav="user-profile"').click();
            cy.wait(2000);

            cy.contains('label', 'Email').parent().find('input').clear().type(email);
            cy.contains('label', 'Email').parent().find('input').should('have.value', email);

            cy.get('button').contains('Save').click({ force: true });

            cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3')
                .should('have.text', 'Enter a valid email address');
        });
    });
});