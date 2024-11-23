import {faker} from '@faker-js/faker';

describe('Create a new tag with long description', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with a valid name and accent color but a long description', () => {
        cy.visit(LOCAL_HOST + "#/tags/new/");
        cy.wait(3000);

        // Generación de datos adecuados y descripción larga
        const validTagName = faker.lorem.word();
        const validAccentColor = faker.internet.color().substring(1);

        cy.get('input[data-test-input="tag-name"]').type(validTagName);
        cy.get('input[data-test-input="accentColor"]').type(validAccentColor);
        cy.wait(1000);
        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);

        // Verificación de que la etiqueta se haya creado con la descripción larga
        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(3000);
        cy.contains(validTagName).should('exist');
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });

});
