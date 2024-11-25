const LOCAL_HOST = Cypress.env('LOCAL_HOST');
const APIREST = Cypress.env('APIREST');

describe('Access profile: View error in invalid x profile', () => {


  beforeEach("Precondition: Admin login", () => {
      cy.LoginGhost();
  });


  Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
  });

  it('Should error in invalid x profile', () => {
      

      cy.request('GET', APIREST).then((response) => {

          expect(response.status).to.eq(200);


          let radom_data = response.body[Math.floor(Math.random() * response.body.length)];

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

          cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3')
              .should('have.text', 'Your Username is not a valid Twitter Username');
      });
  });

});