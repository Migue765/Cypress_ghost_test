describe('Manage tags and sections', () => {
    console.log(Cypress.config());

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const NAME_TAG_1 = Cypress.env('NAME_TAG_1');
    const NAME_TAG_2 = Cypress.env('NAME_TAG_2');
    const TAG_COLOR = Cypress.env('TAG_COLOR');
    const DESCRIPTION = Cypress.env('DESCRIPTION');
    const SCREENSHOT_PATH = 'E011-manage_tags_before/manage_tags';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    it('Create a new tag and verify it', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(3000);
        takeScreenshot();
        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(1000);
        takeScreenshot();
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary').click();
        cy.wait(1000);
        takeScreenshot();
        cy.get('input[data-test-input="tag-name"]').type(NAME_TAG_1);
        takeScreenshot();
        cy.get('input[data-test-input="accentColor"]').type(TAG_COLOR);
        takeScreenshot();
        cy.get('textarea[data-test-input="tag-description"]').type(DESCRIPTION);
        cy.wait(1000);
        takeScreenshot();
        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);
        takeScreenshot();

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(2000);
        takeScreenshot();
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary').click();
        cy.wait(1000);
        takeScreenshot();
        cy.get('input[data-test-input="tag-name"]').type(NAME_TAG_2);
        takeScreenshot();
        cy.get('input[data-test-input="accentColor"]').type(TAG_COLOR);
        takeScreenshot();
        cy.get('textarea[data-test-input="tag-description"]').type(DESCRIPTION);
        cy.wait(1000);
        takeScreenshot();
        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);
        takeScreenshot();

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(3000);
        takeScreenshot();

        cy.contains(NAME_TAG_1).should('exist');
        takeScreenshot();
        cy.contains(NAME_TAG_2).should('exist');
        takeScreenshot();
    });
});
