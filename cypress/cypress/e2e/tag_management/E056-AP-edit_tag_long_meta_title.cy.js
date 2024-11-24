import {faker} from '@faker-js/faker';

describe('Edit an existing tag with invalid slug', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags();
    });

    it('Edit an existing tag and save with an invalid slug', () => {
        cy.visit(LOCAL_HOST + "#/tags");
        cy.wait(3000);

        cy.get('section.view-container.content-list').find('a[title="Edit tag"]').first().click();
        cy.wait(2000);

        cy.get('input[data-test-input="tag-name"]').clear().type(faker.lorem.word());
        cy.get('input[data-test-input="tag-slug"]').clear().type('invalid_slug!@#');

        cy.get('button.gh-btn.gh-btn-expand').first().click();
        const longMetaTitle = faker.lorem.words(40);
        cy.get('input#meta-title').clear().type(longMetaTitle); // Meta title válido
        cy.wait(2000);

        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(1000);

        expect(longMetaTitle.length).to.be.greaterThan(70); // Verifica que el título tenga más de 70 caracteres
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});
