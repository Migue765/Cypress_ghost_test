describe('Edit an existing tag and save the changes', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const NEW_NAME_TAG = Cypress.env('NEW_NAME_TAG');
    const SCREENSHOT_PATH = 'E012-edit_tag_before/edit_tag';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
        cy.createTags();
    });

    it('Edit an existing tag and save the changes', () => {
        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(4000);
        takeScreenshot();

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(2000);
        takeScreenshot();

        cy.get('section.view-container.content-list').find('a[title="Edit tag"]').first().click();
        cy.wait(2000);
        takeScreenshot();

        cy.get('input[data-test-input="tag-name"]').clear();
        cy.get('input[data-test-input="tag-name"]').type(NEW_NAME_TAG);
        cy.wait(2000);
        takeScreenshot();

        cy.get('span[data-test-task-button-state="idle"]').click();
        cy.wait(2000);
        takeScreenshot();

        cy.get('a[data-test-nav="tags"]').click();
        cy.wait(1000);
        takeScreenshot();

        cy.get('section.view-container.content-list').contains(NEW_NAME_TAG).should('exist');
        takeScreenshot();
    });
});
