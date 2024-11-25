import {faker} from '@faker-js/faker';

describe('Edit an existing tag with invalid slug and update Facebook card', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags();
    });

    it('Edit an existing tag, save with an invalid slug, and update Facebook card', () => {
        cy.visit(LOCAL_HOST + "#/tags");
        cy.wait(2000);
        cy.get('section.view-container.content-list').find('a[title="Edit tag"]').first().click();
        cy.wait(2000);

        cy.get('input[data-test-input="tag-name"]').clear().type(faker.lorem.word());
        cy.get('input[data-test-input="tag-slug"]').clear().type('invalid_slug!@#'); // Slug inválido

        cy.get('div.gh-expandable-block').eq(2).within(() => {
            cy.get('button.gh-btn-expand').click();
            cy.get('input#og-title').clear().type(faker.lorem.words(20).substring(0, 100));
            cy.get('p').contains("You’ve used 100").should('exist'); // Verify the character count
        });

        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(1000);

        cy.contains('invalid_slug!@#').should('not.exist'); // Verifica que no exista el slug inválido
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});
