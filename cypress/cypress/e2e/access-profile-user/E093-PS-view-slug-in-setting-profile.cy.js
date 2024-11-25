const LOCAL_HOST = Cypress.env('LOCAL_HOST');
const APIREST = Cypress.env('APIREST');

describe('Access profile: slug in setting profile', () => {

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });


    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Should slug in setting profile', () => {

        cy.request('GET', APIREST + '?schema=EditProfile').then((response) => {

            expect(response.status).to.eq(200);


            let radom_data = response.body[Math.floor(Math.random() * response.body.length)];


            const name = radom_data.fullname;
            const location = radom_data.Location;
            const website = radom_data.Website;
            const slugname = radom_data.Slug;
            const Facebook = radom_data.Facebook;
            const xprofile = radom_data.x;
            const bio = radom_data.Bio;


            cy.visit(LOCAL_HOST + "#/dashboard");
            cy.wait(2000);
            cy.get('div.gh-user-avatar.relative').click();
            cy.get('a[data-test-nav="user-profile"').click();
            cy.wait(2000);

            cy.contains('label', 'Full name').parent().find('input').clear().type(name);
            cy.contains('label', 'Full name').parent().find('input').should('have.value', name);

            cy.contains('label', 'Location').parent().find('input').clear().type(location);
            cy.contains('label', 'Location').parent().find('input').should('have.value', location);

            cy.contains('label', 'Website').parent().find('input').clear().type(website);
            cy.contains('label', 'Website').parent().find('input').should('have.value', website);

            cy.contains('label', 'Slug').parent().find('input').clear().type(slugname);
            cy.contains('label', 'Slug').parent().find('input').should('have.value', slugname);

            cy.contains('label', 'Facebook profile').parent().find('input').clear().type(Facebook);
            cy.contains('label', 'Facebook profile').parent().find('input').should('have.value', Facebook);

            cy.contains('label', 'X (formerly Twitter) profile').parent().find('input').clear().type(xprofile);
            cy.contains('label', 'X (formerly Twitter) profile').parent().find('input').should('have.value', xprofile);

            cy.contains('label', 'Bio').parent().find('textarea').clear().type(bio);
            cy.contains('label', 'Bio').parent().find('textarea').should('have.value', bio);

            cy.get('button').contains('Save').click({ force: true });
            cy.wait(500);
            cy.contains('strong', 'Owner').should('be.visible').click();
            cy.contains('label', 'Slug').parent().find('input').should('have.value', slugname);
        });
    });
});