const mockData = require('./MOCK_DATA.json');

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

        const randomData = mockData[Math.floor(Math.random() * mockData.length)];
        const tagSlug = randomData.tagSlug;
        const tagName = randomData.tagName;
        const facebookCardTitle = randomData.facebookCardTitle;

        cy.get('input[data-test-input="tag-name"]').clear().type(tagName);
        cy.get('input[data-test-input="tag-slug"]').clear().type(tagSlug);

        // Actualizar la tarjeta de Facebook
        cy.get('div.gh-expandable-block').eq(2).within(() => {
            cy.get('button.gh-btn-expand').click();
            cy.get('input#og-title').clear().type(facebookCardTitle);
            cy.get('p').contains("You’ve used").should('exist');
        });

        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(1000);
    });

    it('Delete all tags and verify they are not in the tag list', () => {
        cy.deleteAllTags();
    });
});
