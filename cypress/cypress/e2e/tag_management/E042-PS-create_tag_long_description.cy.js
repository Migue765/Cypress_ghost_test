const LOCAL_HOST = Cypress.env('LOCAL_HOST');
const APIREST = Cypress.env('APIREST');

describe('Create a new tag with long description', () => {

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with a valid name, accent color, and a long description', () => {

        cy.request('GET', APIREST + '?schema=tag').then((response) => {

            expect(response.status).to.eq(200);

            let radom_data = response.body[Math.floor(Math.random() * response.body.length)];
            const validTagName = radom_data.tagName;
            const validAccentColor = radom_data.accentColor.replace(/^#/, '');
            const longDescription = radom_data.longDescription;

            cy.visit(LOCAL_HOST + "#/tags/new/");
            cy.wait(3000);


            cy.get('input[data-test-input="tag-name"]').type(validTagName);
            cy.get('input[data-test-input="accentColor"]').type(validAccentColor);
            cy.get('textarea[data-test-input="tag-description"]').type(longDescription); // Usar la descripción larga
            cy.wait(1000);

            cy.get('p').contains('Maximum:');

        });
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});
