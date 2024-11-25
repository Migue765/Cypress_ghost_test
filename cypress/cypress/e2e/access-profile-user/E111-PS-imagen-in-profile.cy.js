const APIREST = Cypress.env('APIREST');
const LOCAL_HOST = Cypress.env('LOCAL_HOST');
describe('Access profile: View update image profile', () => {

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });


    Cypress.on('uncaught:exception', (err, runnable) => {
     
        return false;
    });

    it('Should view image in profile', () => {


        cy.request('GET', APIREST).then((response) => {
       
            expect(response.status).to.eq(200);


            let radom_data = response.body[Math.floor(Math.random() * response.body.length)];
            const imagenFalsaUrl = radom_data.image; 


            cy.log('Imagen generada:', imagenFalsaUrl);


            cy.visit(LOCAL_HOST + "#/dashboard");
            cy.wait(2000);
            cy.get('div.gh-user-avatar.relative').click();
            cy.get('a[data-test-nav="user-profile"').click();
            cy.wait(2000);

    
            cy.get('#avatar').attachFile('picture.jpg'); 

            cy.get('#avatar')
                .should('exist') 
                .and('have.prop', 'tagName', 'IMG') 
                .and('be.visible');
        });
    });
});