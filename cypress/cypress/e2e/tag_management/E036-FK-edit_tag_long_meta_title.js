import {faker} from '@faker-js/faker';

describe('Edit an existing tag with invalid slug', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags();
    });

    it('Edit an existing tag and save with an invalid slug', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(4000);

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(2000);
        cy.get('section.view-container.content-list').find('a[title="Edit tag"]').first().click();
        cy.wait(2000);

        cy.get('input[data-test-input="tag-name"]').clear().type(faker.lorem.word());
        cy.get('input[data-test-input="tag-slug"]').clear().type('invalid_slug!@#'); // Slug inválido

        cy.get('button.gh-btn.gh-btn-expand').first().click();
        cy.get('input#meta-title').clear().type('Meta Title with Invalid Slug'); // Meta title válido
        cy.wait(2000);

        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(1000);

        cy.contains('invalid_slug!@#').should('not.exist'); // Verifica que no exista el slug inválido
    });

});
