describe('Access profile: View error update website', () => {

    const LOCAL_HOST = Cypress.env('LOCAL_HOST');
    const SCREENSHOT_PATH = 'E005-view_error_update_website_before/view_history_activity';
    let screenshotCounter = 1;
    const NAME = Cypress.env('NAME');

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

    it('View error update website', () => {

        cy.visit(LOCAL_HOST + "#/dashboard");
        cy.wait(2000);
        cy.get('div.gh-user-avatar.relative').click();
        cy.get('a[data-test-nav="user-profile"').click();
        cy.wait(2000);
        cy.contains('label', 'Website').should('be.visible').parent().find('input').should('be.visible').type("error site");
        cy.get('button').contains('Save').click({force: true});

    });
});
