describe('Content Management: Create and Verify Page', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E008-create_page_before/create_page';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

    it('Create a new page and verify it appears in the list of pages', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(4000);
        takeScreenshot();

        // Enter the pages section
        cy.get('[data-test-nav="pages"]').click();
        cy.url().should('include', '/ghost/#/pages');
        takeScreenshot();

        // Create a new page
        cy.get('[data-test-new-page-button]').click();
        cy.wait(2000);
        cy.url().should('include', '/ghost/#/editor/page');
        takeScreenshot();

        // Wait for the editor to be visible
        cy.get('.gh-editor-title', {timeout: 10000}).should('be.visible');
        takeScreenshot();

        // Fill out the new page form
        cy.get('.gh-editor-title').type('My first page{enter}');
        cy.get('[data-secondary-instance="false"]').type("hello");
        takeScreenshot();

        // Publish the page
        cy.get('[data-test-button="publish-flow"]').first().click();
        cy.get('[data-test-button="continue"]').click();
        cy.get('[data-test-button="confirm-publish"]').click();
        takeScreenshot();

        // Click the close button
        cy.get('[data-test-button="close-publish-flow"]').click();
        takeScreenshot();

        // Verify that the page has been published
        cy.url().should('include', '/ghost/#/pages');
        takeScreenshot();
    });
});
