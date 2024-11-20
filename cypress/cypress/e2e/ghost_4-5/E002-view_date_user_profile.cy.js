describe('Access profile: view date user profile ', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = '../screenshots (ghost_4.5)/E002-view_date_user_profile_before/view_date_user_profile';
    let screenshotCounter = 1;
    const NAME = Cypress.env('NAME');

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

    it('View date user', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        takeScreenshot();

        // click profile section
        cy.get('div.gh-user-avatar.relative').click();
        takeScreenshot();
        cy.get('.dropdown-menu.dropdown-triangle-top').should('be.visible');
        cy.get('a[href="#/staff/jaime-larson/"]').click();
        takeScreenshot();
        cy.get('header.gh-canvas-header-content h2.gh-canvas-title').contains('Jaime Larson').should('exist');
        takeScreenshot();

    });


});
