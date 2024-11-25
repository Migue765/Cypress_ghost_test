const mockData = require('./MOCK_DATA.json');

describe('Edit an existing tag with a long meta title', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const randomData = mockData[Math.floor(Math.random() * mockData.length)];

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags();
    });

    it('Edit an existing tag and save with a long meta title', () => {
        cy.visit(LOCAL_HOST + "#/tags");
        cy.wait(3000);

        cy.get('section.view-container.content-list').find('a[title="Edit tag"]').first().click();
        cy.wait(2000);

        // Usar el nombre y slug del json
        const VALID_TAG_NAME = randomData.tagName;
        const tagSlug = randomData.tagSlug;

        cy.get('input[data-test-input="tag-name"]').clear().type(VALID_TAG_NAME);
        cy.get('input[data-test-input="tag-slug"]').clear().type(tagSlug);

        cy.get('button.gh-btn.gh-btn-expand').first().click();
        cy.get('input#meta-title').clear().type(randomData.longMetaTitle);
        cy.wait(2000);

        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(1000);

        cy.contains(VALID_TAG_NAME).should('exist');
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });

});
