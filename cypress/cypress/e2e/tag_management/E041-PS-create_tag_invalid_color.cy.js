const LOCAL_HOST = Cypress.env('LOCAL_HOST');
const APIREST = Cypress.env('APIREST');

describe('Create a new tag with invalid accent color', () => {

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with an invalid accent color format', () => {

        cy.request('GET', APIREST + '?schema=tag').then((response) => {

            expect(response.status).to.eq(200);
            let radom_data = response.body[Math.floor(Math.random() * response.body.length)];

            const randomTagName = radom_data.tagName;
            const invalidAccentColor = radom_data.accentColor;
            const description = radom_data.description;

            cy.visit(LOCAL_HOST + "#/tags/new/");
            cy.wait(3000);


            cy.get('input[data-test-input="tag-name"]').type(randomTagName);
            cy.get('input[data-test-input="accentColor"]').type(invalidAccentColor);
            cy.get('textarea[data-test-input="tag-description"]').type(description);

            cy.wait(1000);

            // Verificación de mensaje de error para color de acento inválido
            cy.get('p[data-test-error="accentColor"]').should('contain.text',
                'The colour should be in valid hex format');

            // Intentar enviar los cambios
            cy.get('span[data-test-task-button-state="idle"]').click();
        });


    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});
