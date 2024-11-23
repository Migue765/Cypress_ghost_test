import {faker} from '@faker-js/faker';

describe('Edit an existing tag with a long name', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags();
    });

    it('Edit an existing tag and save with a long name', () => {
        cy.visit(LOCAL_HOST + "#/tags");
        cy.wait(3000);

        const LONG_TAG_NAME = faker.lorem.words(4);

        cy.get('section.view-container.content-list').find('a[title="Edit tag"]').first().click();
        cy.wait(2000);

        cy.get('input[data-test-input="tag-name"]').clear();
        cy.get('input[data-test-input="tag-name"]').type(LONG_TAG_NAME);
        cy.get('input[data-test-input="tag-slug"]').clear().type(faker.lorem.slug());  // Genera un slug
        cy.wait(2000);

        cy.get('button.gh-btn.gh-btn-expand').first().click();
        cy.get('input#meta-title').clear().type('Meta Title for Long Tag'); // Meta title válido
        cy.wait(2000);

        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(1000);

        cy.get('section.view-container.content-list').contains(LONG_TAG_NAME).should('exist');
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });

});
