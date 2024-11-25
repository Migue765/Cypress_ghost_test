const LOCAL_HOST = Cypress.env('LOCAL_HOST');
const APIREST = Cypress.env('APIREST');

describe('Create a new tag with long name', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with a very long name', () => {

        cy.request('GET', APIREST + '?schema=tag').then((response) => {
            expect(response.status).to.eq(200);

            let radom_data = response.body[Math.floor(Math.random() * response.body.length)];

            const longTagName = radom_data.longDescription; // Campo para el nombre de la etiqueta

            cy.visit(LOCAL_HOST + "#/tags/new/");
            cy.wait(3000);


            cy.get('input[data-test-input="tag-name"]').type(longTagName);
            cy.get('input[data-test-input="accentColor"]')
                .type(radom_data.accentColor.replace(/^#/, ''));
            cy.get('textarea[data-test-input="tag-description"]').type(radom_data.description);
            cy.wait(1000);

            cy.get('.mr2 > .error > :nth-child(1)').should('contain.text',
                'Tag names cannot be longer than');
        });
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});
