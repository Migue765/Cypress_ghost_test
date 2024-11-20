describe('Content Management: Create and Verify Page', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = '../screenshots (ghost_4.5)/E008-create_page_before/create_page';
    let screenshotCounter = 1;

    function takeScreenshot() {
        cy.screenshot(`${SCREENSHOT_PATH}_${screenshotCounter}`);
        screenshotCounter++;
    }

    beforeEach("Precondition: Admin login", () => {
        cy.LoginGhost4();
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Return false to prevent Cypress from failing the test
        return false;
    });

    it('Create a new page and verify it appears in the list of pages', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        takeScreenshot();

        // Enter the pages section
        cy.get('a[href="#/pages/"]').click();
        cy.url().should('include', '/ghost/#/pages');
        takeScreenshot();

        // Create a new page
        cy.get('a[href="#/editor/page/"]').click();
        cy.wait(2000);
        cy.url().should('include', '/ghost/#/editor/page');
        takeScreenshot();

        // Wait for the editor to be visible
        cy.get('.gh-editor-title', {timeout: 10000}).should('be.visible');
        takeScreenshot();

        // Fill out the new page form
        cy.get('.gh-editor-title').type('My first page{enter}');
        cy.get('div[data-kg="editor-wrapper"] div[data-kg="editor"]').type("hello");
        takeScreenshot();

        // Publish the page
        cy.get('.gh-publishmenu-trigger').first().click();
        cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon').click();
        takeScreenshot();

        // Click the close button
        cy.get('.gh-editor-back-button').click();
        takeScreenshot();

        // Verify that the page has been published
        cy.url().should('include', '/ghost/#/pages');
        takeScreenshot();
    });
});
