import {faker} from '@faker-js/faker';

describe('Create a new tag with invalid accent color', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with an invalid accent color format', () => {
        cy.visit(LOCAL_HOST + "#/tags/new/");
        cy.wait(3000);

        // Generación de datos aleatorios
        const randomTagName = faker.lorem.word();
        const invalidAccentColor = "#" + faker.internet.color().substring(1);

        cy.get('input[data-test-input="tag-name"]').type(randomTagName);
        cy.get('input[data-test-input="accentColor"]').type(invalidAccentColor);
        cy.get('textarea[data-test-input="tag-description"]').type(faker.lorem.text());
        cy.wait(1000);

        cy.get('p[data-test-error="accentColor"]').should('contain.text',
            'The colour should be in valid hex format');

        cy.get('span[data-test-task-button-state="idle"]').click();
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });

});
