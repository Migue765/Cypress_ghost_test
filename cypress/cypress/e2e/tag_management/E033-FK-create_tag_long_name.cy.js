import {faker} from '@faker-js/faker';

describe('Create a new tag with long name', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with a very long name', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(3000);

        // Generación de un nombre muy largo
        const longTagName = faker.lorem.words(50); // Genera un nombre de 50 palabras

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(1000);
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary').click();
        cy.wait(1000);
        cy.get('input[data-test-input="tag-name"]').type(longTagName);
        cy.get('input[data-test-input="accentColor"]').type(faker.internet.color().substring(1));
        cy.get('textarea[data-test-input="tag-description"]').type(faker.lorem.text());
        cy.wait(1000);
        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);

        // Verificación de la existencia de la etiqueta creada
        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(3000);
        cy.contains(longTagName).should('exist');
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });

});
