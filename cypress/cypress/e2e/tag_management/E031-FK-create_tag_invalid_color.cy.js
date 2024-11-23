import { faker } from '@faker-js/faker';

describe('Create a new tag with invalid accent color', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with an invalid accent color format', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(3000);

        // Generación de datos aleatorios
        const randomTagName = faker.lorem.word();
        const invalidAccentColor = "not_a_valid_color"; // Texto no válido para color

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(1000);
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary').click();
        cy.wait(1000);
        cy.get('input[data-test-input="tag-name"]').type(randomTagName);
        cy.get('input[data-test-input="accentColor"]').type(invalidAccentColor);
        cy.get('textarea[data-test-input="tag-description"]').type(faker.lorem.text());
        cy.wait(1000);
        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);

        // Verificación de que se muestre un mensaje de error o que no se haya creado la etiqueta
        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(3000);
        cy.contains(randomTagName).should('not.exist'); // Esperamos que no exista la etiqueta
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });

});
