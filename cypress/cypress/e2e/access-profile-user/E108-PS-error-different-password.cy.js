const LOCAL_HOST = Cypress.env('LOCAL_HOST');
const PASSWORD = Cypress.env('PASSWORD');
const APIREST = Cypress.env('APIREST');

describe('Access profile: View error different password', () => {


    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });


    Cypress.on('uncaught:exception', (err, runnable) => {
     
        return false;
    });

    it('Should view error different password', () => {

        const password = PASSWORD;

       
        cy.request('GET', APIREST).then((response) => {
            
            expect(response.status).to.eq(200);

            
            let radom_data = response.body[Math.floor(Math.random() * response.body.length)];
            const passwordnew = radom_data.password;  
            const passwordRepit = radom_data.fullname; 

            cy.visit(LOCAL_HOST + "#/dashboard");
            cy.wait(2000);
            cy.get('div.gh-user-avatar.relative').click();
            cy.get('a[data-test-nav="user-profile"').click();
            cy.wait(2000);

            
            cy.get('button').contains('Change password').click({force: true});

         
            cy.contains('label', 'Old password').parent().find('input').clear().type(password);
            cy.contains('label', 'Old password').parent().find('input').should('have.value', password);

            cy.contains('label', 'New password').parent().find('input').clear().type(passwordnew);
            cy.contains('label', 'New password').parent().find('input').should('have.value', passwordnew);

            cy.contains('label', 'Verify password').parent().find('input').clear().type(passwordRepit);
            cy.contains('label', 'Verify password').parent().find('input').should('have.value', passwordRepit);

          
            cy.get('button').contains('Change password').click({force: true});

      
            cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3')
                .should('have.text', 'Your new passwords do not matchYour new passwords do not match');
        });
    });
});