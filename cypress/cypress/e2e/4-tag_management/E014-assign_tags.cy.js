describe('Assign multiple tags to a post and verify they are saved correctly', () => {
    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const NAME_TAG_1 = Cypress.env('NAME_TAG_1');
    const NAME_TAG_2 = Cypress.env('NAME_TAG_2');
    const SCREENSHOT_PATH = 'E014-assign_tags_before/assign_tags';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags();
    });

    it('Assign multiple tags to a post and verify they are saved correctly', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(1000);
        takeScreenshot();

        cy.get('a[data-test-nav-custom="posts-Published"]').click();
        cy.wait(1000);
        takeScreenshot();

        cy.get('li.gh-list-row.gh-posts-list-item.gh-post-list-plain-status:first a.gh-list-data.gh-post-list-title').click({force: true});
        cy.wait(1000);
        takeScreenshot();

        cy.get('button.settings-menu-toggle.gh-btn.gh-btn-editor.gh-btn-icon.icon-only.gh-btn-action-icon[title="Settings"]').click();
        cy.wait(1000);
        takeScreenshot();

        cy.get('div#tag-input').click().type(NAME_TAG_1 + '{enter}').type(NAME_TAG_2 + '{enter}');
        cy.wait(1000);
        takeScreenshot();

        cy.contains(NAME_TAG_1).should('exist');
        takeScreenshot();
        cy.contains(NAME_TAG_2).should('exist');
        takeScreenshot();
    });
});
