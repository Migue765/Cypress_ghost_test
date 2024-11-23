import { faker } from '@faker-js/faker';

describe('Edit an existing tag with a long meta title', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const VALID_TAG_NAME = faker.lorem.word();
    const LONG_META_TITLE = faker.lorem.words(50); // Genera un meta título de 50 palabras

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags();
    });

    it('Edit an existing tag and save with a long meta title', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(4000);

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(2000);
        cy.get('section.view-container.content-list').find('a[title="Edit tag"]').first().click();
        cy.wait(2000);

        cy.get('input[data-test-input="tag-name"]').clear().type(VALID_TAG_NAME);
        cy.get('input[data-test-input="tag-slug"]').clear().type(faker.lorem.slug()); // Genera un slug válido

        cy.get('button.gh-btn.gh-btn-expand').first().click();
        cy.get('input#meta-title').clear().type(LONG_META_TITLE); // Título muy largo
        cy.wait(2000);

        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(1000);

        cy.contains(VALID_TAG_NAME).should('exist'); // Verificación de la existencia de la etiqueta editada
    });

});
