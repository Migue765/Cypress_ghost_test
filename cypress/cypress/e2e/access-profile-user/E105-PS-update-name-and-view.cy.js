const LOCAL_HOST = Cypress.env('LOCAL_HOST');
const APIREST = Cypress.env('APIREST');

describe('Access profile: View name update', () => {


  beforeEach("Precondition: Admin login", () => {
      cy.LoginGhost();
  });

  Cypress.on('uncaught:exception', (err, runnable) => {

      return false;
  });

  it('I should update a name and view the name', () => {

      cy.request('GET', APIREST + '?schema=EditProfile').then((response) => {
   
          expect(response.status).to.eq(200);

      
          let radom_data = response.body[Math.floor(Math.random() * response.body.length)];
          const name = radom_data.fullname;  


          cy.visit(LOCAL_HOST + "#/dashboard");
          cy.wait(2000);
          cy.get('div.gh-user-avatar.relative').click();
          cy.get('a[data-test-nav="user-profile"').click();
          cy.wait(2000);


          cy.contains('label', 'Full name').parent().find('input').clear().type(name);
          cy.contains('label', 'Full name').parent().find('input').should('have.value', name);

          cy.get('button').contains('Save').click({ force: true });


          cy.get('h1.break-words.md\\:break-normal.text-white.md\\:text-4xl.leading-tighter')
              .scrollIntoView({ behavior: 'smooth', block: 'center' })
              .should('be.visible') 
              .contains(name); // 
      });
  });

});