import {faker} from '@faker-js/faker';

describe('Create a new tag with long name', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag with a very long name', () => {
        cy.visit(LOCAL_HOST + "#/tags/new/");
        cy.wait(3000);

        // Generación de un nombre muy largo
        const longTagName = faker.lorem.words(191);

        cy.get('input[data-test-input="tag-name"]').type(longTagName);
        cy.get('input[data-test-input="accentColor"]').type(faker.internet.color().substring(1));
        cy.get('textarea[data-test-input="tag-description"]').type(faker.lorem.text());
        cy.wait(1000);

        cy.get('.mr2 > .error > :nth-child(1)').should('contain.text',
            'Tag names cannot be longer than');
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });

});
