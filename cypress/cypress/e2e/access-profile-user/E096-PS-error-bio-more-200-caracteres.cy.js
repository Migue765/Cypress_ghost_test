const LOCAL_HOST = Cypress.env('LOCAL_HOST');
const APIREST = Cypress.env('APIREST');

beforeEach("Precondition: Admin login", () => {
    cy.LoginGhost();
});


Cypress.on('uncaught:exception', (err, runnable) => {

    return false;
});

it('I should see error update more 200 characters', () => {

    let bios = '';

    cy.request('GET', APIREST + '?schema=EditProfile').then((response) => {
        expect(response.status).to.eq(200);

        for (let i = 0; i < 5; i++) {
            const randomData = response.body[Math.floor(Math.random() * response.body.length)];
            const bio1 = randomData.Bio;
            bios += bio1 + '\n'; 
        }


        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);


        cy.contains('label', 'Bio').parent().find('textarea').clear().type(bios);
        cy.contains('label', 'Bio').parent().find('textarea').should('have.value', bios);


        cy.get('button').contains('Save').click({ force: true });
        cy.get('span.mt-1.inline-block.text-xs.text-red.dark\\:text-red-500.order-3')
            .should('have.text', 'Bio is too long');
    });
});